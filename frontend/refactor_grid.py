import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    grid_map = {
        r"gridTemplateColumns:\s*'1fr 1fr 1fr'": "grid-responsive-3col",
        r"gridTemplateColumns:\s*'1fr 1fr'": "grid-responsive-2col",
        r"gridTemplateColumns:\s*'repeat\(3,\s*1fr\)'": "grid-responsive-3col",
        r"gridTemplateColumns:\s*'repeat\(4,\s*1fr\)'": "grid-responsive-4col",
        r"gridTemplateColumns:\s*'250px 1fr'": "grid-responsive-sidebar",
        r"gridTemplateColumns:\s*'260px 1fr'": "grid-responsive-sidebar",
        r"gridTemplateColumns:\s*'240px 1fr'": "grid-responsive-sidebar-narrow",
        r"gridTemplateColumns:\s*'220px 1fr'": "grid-responsive-sidebar-narrow",
        r"gridTemplateColumns:\s*'300px 1fr'": "grid-responsive-sidebar-wide",
        r"gridTemplateColumns:\s*'320px 1fr'": "grid-responsive-sidebar-wide",
        r"gridTemplateColumns:\s*'1fr 400px'": "grid-responsive-checkout",
        r"gridTemplateColumns:\s*'1\.6fr 1fr'": "grid-responsive-pcbuilder",
        r"gridTemplateColumns:\s*'1\.2fr 1fr'": "grid-responsive-overview",
        r"gridTemplateColumns:\s*'1fr 1\.2fr'": "grid-responsive-1_2fr",
    }

    # Iterate through all grid maps and apply replacements
    for pattern, class_name in grid_map.items():
        # Match something like: style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '...' }}
        # We want to capture the whole tag <div ... > to see if there is an existing className
        
        # Regex to find style={{...}} containing the pattern
        # (?s) makes . match newlines
        style_regex = re.compile(r"(style=\{\{\s*)([^}]*?)(" + pattern + r")([^}]*?)(\}\})")
        
        def style_replacer(match):
            prefix = match.group(1)
            before = match.group(2)
            matched_pattern = match.group(3)
            after = match.group(4)
            suffix = match.group(5)
            
            # Clean up commas
            before_clean = before.rstrip(', \n')
            after_clean = after.lstrip(', \n')
            
            new_style_inner = before_clean
            if before_clean and after_clean:
                new_style_inner += ", " + after_clean
            elif after_clean:
                new_style_inner += after_clean
                
            # If style only contained display: 'grid' and gridTemplateColumns, it might just be empty now,
            # or just display: 'grid'. We can leave display: 'grid' inside, it's fine.
            return f"{prefix}{new_style_inner}{suffix} className=\"{class_name}\""

        content = style_regex.sub(style_replacer, content)

    # Now we might have <div style={{...}} className="grid-responsive-2col" className="catalog-layout">
    # We need to merge them.
    # A simple regex to merge multiple className attributes in the same tag
    # This is tricky, but let's assume they might be adjacent or close.
    # Actually, a better approach is to merge them: className="grid-responsive-2col catalog-layout"
    
    # We can run a regex over < ... > blocks
    def merge_classnames(match):
        tag_content = match.group(0)
        classes = []
        # Find all className="..." or className={'...'}
        # It's a bit complex. Let's just find className="..."
        class_regex = re.compile(r'className="([^"]+)"')
        for c in class_regex.findall(tag_content):
            classes.extend(c.split())
        
        if len(classes) > 0:
            # unique classes
            seen = set()
            unique_classes = [x for x in classes if not (x in seen or seen.add(x))]
            new_class_str = 'className="' + ' '.join(unique_classes) + '"'
            # remove old classNames
            tag_content = class_regex.sub('', tag_content)
            # insert new className before the end of the tag (before >)
            # wait, if tag ends with />, insert before />
            if tag_content.endswith('/>'):
                return tag_content[:-2] + ' ' + new_class_str + ' />'
            else:
                return tag_content[:-1] + ' ' + new_class_str + '>'
        return tag_content

    # Match <div ... > or <form ... > etc. 
    # Not matching self-closing strictly, just matching < followed by non-< up to >
    content = re.sub(r'<[A-Za-z][^>]*>', merge_classnames, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Modified {filepath}")

def main():
    src_dir = r"c:\Users\Admin\kinetic_tech\frontend\src"
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.jsx'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
