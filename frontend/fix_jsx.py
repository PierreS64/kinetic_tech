import os
import re

def main():
    src_dir = r"c:\Users\Admin\kinetic_tech\frontend\src"
    
    # Regex to match the corrupted syntax
    # e.g. onClick={(e) = className="glass-panel animate-fade-in-up">
    # group 1: event name (e.g. onClick)
    # group 2: args (e.g. e, or empty)
    # group 3: class names
    corrupt_regex = re.compile(r'([a-zA-Z]+)=\{\(([^)]*)\)\s*=\s*className="([^"]+)"\s*>')

    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                def replacer(match):
                    attr = match.group(1)
                    args = match.group(2)
                    classes = match.group(3)
                    
                    return f'className="{classes}" {attr}={{({args}) =>'

                content = corrupt_regex.sub(replacer, content)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Fixed {filepath}")

if __name__ == "__main__":
    main()
