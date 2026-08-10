from PIL import Image, ImageDraw
img = Image.open('public/logo.png').convert('RGBA')
w, h = img.size
mask = Image.new('L', (w, h), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, w, h), fill=255)
result = Image.new('RGBA', (w, h))
result.paste(img, (0, 0), mask)
result.save('public/logo-circle.png')
print('saved public/logo-circle.png')
