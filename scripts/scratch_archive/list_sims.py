import os, glob

sims = glob.glob('simuladores/*.html')
print(f'Total HTML in simuladores: {len(sims)}')
stubs = []
real = []
for s in sims:
    with open(s, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    if 'http-equiv="refresh"' in c or 'window.location.replace' in c:
        stubs.append(os.path.basename(s))
    else:
        real.append(os.path.basename(s))

print(f'Stubs: {len(stubs)}')
print(f'Real simulators: {len(real)}')
print('Real simulators list:')
for r in sorted(real):
    print(f' - {r}')
