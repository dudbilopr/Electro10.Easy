from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_viewer = False
        self.depth = 0
        self.viewer_depth = -1
        self.output = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if attr_dict.get('id') == 'main-viewer-area':
            self.in_viewer = True
            self.viewer_depth = self.depth
        
        if self.in_viewer:
            indent = '  ' * (self.depth - self.viewer_depth)
            cls = attr_dict.get('class', '')
            idd = attr_dict.get('id', '')
            self.output.append(f'{indent}<{tag} class="{cls}" id="{idd}">')
        self.depth += 1

    def handle_endtag(self, tag):
        self.depth -= 1
        if self.in_viewer and self.depth < self.viewer_depth:
            self.in_viewer = False

with open('c:/Users/dudbi/Downloads/EMI_COURSE/Electro10.Easy_repo/index.html', 'r', encoding='utf-8') as f:
    text = f.read()
parser = MyHTMLParser()
parser.feed(text)
for line in parser.output[50:]:
    print(line)
