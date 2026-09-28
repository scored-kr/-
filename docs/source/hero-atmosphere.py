import numpy as np, math, random
from PIL import Image, ImageDraw, ImageFilter
random.seed(7); np.random.seed(7)
W,H=2560,1600
def leaf_poly(cx,cy,L,Wd,ang):
    pts=[]
    for t in np.linspace(0,1,40):
        x=t*L; y=Wd*math.sin(math.pi*t)**0.9*(1-0.25*t)
        pts.append((x,y))
    for t in np.linspace(1,0,40):
        x=t*L; y=-Wd*math.sin(math.pi*t)**0.9*(1-0.25*t)
        pts.append((x,y))
    ca,sa=math.cos(ang),math.sin(ang)
    return [(cx+x*ca-y*sa, cy+x*sa+y*ca) for x,y in pts]
def branch_layer(seed, base, count, scale, blur, alpha, region):
    rnd=random.Random(seed)
    m=Image.new('L',(W,H),0); d=ImageDraw.Draw(m)
    x0,y0,x1,y1=region
    for b in range(count):
        # a branch: line with leaves along it
        sx=rnd.uniform(x0,x1); sy=rnd.uniform(y0,y1)
        ang=rnd.uniform(-2.6,-0.6) if sx<W/2 else rnd.uniform(-2.6+math.pi/2,-0.4)
        ang=rnd.uniform(0,2*math.pi)
        length=rnd.uniform(300,700)*scale
        steps=rnd.randint(4,6)
        for s in range(steps):
            t=s/steps
            px=sx+math.cos(ang)*length*t; py=sy+math.sin(ang)*length*t
            for side in (-1,1):
                la=ang+side*rnd.uniform(0.5,1.1)
                L=rnd.uniform(150,260)*scale*(1-0.4*t); Wd=L*rnd.uniform(0.22,0.3)
                d.polygon(leaf_poly(px,py,L,Wd,la),fill=255)
        d.line([(sx,sy),(sx+math.cos(ang)*length,sy+math.sin(ang)*length)],fill=255,width=int(6*scale))
    m=m.filter(ImageFilter.GaussianBlur(blur))
    return (np.asarray(m,dtype=np.float32)/255.0)*alpha
yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
# base deep green, darker at edges
base=np.zeros((H,W,3),np.float32)
c1=np.array([50,70,65]); c2=np.array([33,47,43])
v=((xx-W*0.55)/W)**2+((yy-H*0.45)/H)**2
k=np.clip(v*2.2,0,1)[...,None]
base=c1*(1-k)+c2*k
# light rays from top-right
ray=np.zeros((H,W),np.float32)
for off,wid,s in [(0,90,0.55),(260,60,0.35),(-240,140,0.3),(520,40,0.22)]:
    # line direction from (W*0.95,-100) going down-left
    ang=math.radians(125)
    nx,ny=-math.sin(ang),math.cos(ang)
    dist=(xx-(W*0.92+off))*nx+(yy+120)*ny
    along=(xx-(W*0.92+off))*math.cos(ang)+(yy+120)*math.sin(ang)
    fall=np.clip(1-along/2000,0,1)
    ray+=s*np.exp(-(dist/wid)**2)*fall
ray=np.asarray(Image.fromarray((np.clip(ray,0,1)*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(40)),np.float32)/255
glow=np.exp(-(((xx-W*0.85)/(W*0.35))**2+((yy-H*0.05)/(H*0.5))**2))*0.35
light=np.clip(ray+glow,0,1)[...,None]
img=base+light*np.array([58,78,72])
# leaf shadows (dark) far, blurry
far=branch_layer(3,None,6,0.9,22,0.6,(-150,-100,600,H+100))
far2=branch_layer(11,None,4,0.85,24,0.55,(W-520,H*0.55,W+150,H+150))
img=img*(1-far[...,None]*0.75)
img=img*(1-far2[...,None]*0.7)
# near leaves, lit edge (lighter green), mid blur
near=branch_layer(5,None,2,1.05,11,0.95,(-200,H*0.15,300,H*0.85))
lit=np.array([46,98,74])
img=img*(1-near[...,None]*0.5)
nearR=branch_layer(21,None,2,0.95,13,0.8,(W-260,H*0.7,W+100,H+100))
img=img*(1-nearR[...,None]*0.45)
# keep center calm: darken slightly toward center for logo legibility
cen=np.exp(-(((xx-W/2)/(W*0.22))**2+((yy-H*0.48)/(H*0.3))**2))[...,None]
img=img*(1-0.12*cen)
# grain
img+=np.random.normal(0,3.2,(H,W,1))
img=np.clip(img,0,255).astype(np.uint8)
Image.fromarray(img).save('hero-atmosphere.jpg',quality=86,optimize=True,progressive=True)
im=Image.fromarray(img); im.thumbnail((1200,1200)); im.save('hero_prev.jpg')
