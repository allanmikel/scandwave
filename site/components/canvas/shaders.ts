// GLSL shaders for the ocean surface.
// Design intent: abstract physics-based wave field driven by a superposition
// of trochoidal / Gerstner-style components + cheap fbm for micro-chop.
// Responds to: uTime, uScrollProgress, uChaos (resistance), uFlow (energy), uPointer.

export const oceanVertexShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScrollProgress;   // 0..1 overall scroll
  uniform float uChaos;            // 0..1 instability
  uniform float uFlow;             // 0..1 organised flow
  uniform vec2  uPointer;          // -1..1 normalised
  uniform float uReduced;          // 0 or 1 — reduced motion

  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying float vElevation;
  varying float vCrest;
  varying vec3 vNormal;

  // hash + value noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*vnoise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  // Gerstner wave returning displacement (x,y,z)
  vec3 gerstner(vec2 pos, vec2 dir, float wavelength, float steepness, float speed, float t){
    float k = 6.2831853 / wavelength;
    float c = sqrt(9.81 / k);
    vec2 d = normalize(dir);
    float f = k * dot(d, pos) - c * t * speed;
    float a = steepness / k;
    return vec3(
      d.x * (a * cos(f)),
      a * sin(f),
      d.y * (a * cos(f))
    );
  }

  void main(){
    vUv = uv;

    vec3 p = position;
    float t = uTime * (0.55 + uFlow * 0.35);
    float reduce = 1.0 - uReduced * 0.85;

    // Primary organised waves — become more ordered as uFlow rises
    vec3 w1 = gerstner(p.xz, vec2( 1.0, 0.25), 18.0, 0.20, 0.40, t);
    vec3 w2 = gerstner(p.xz, vec2( 0.6, 0.95), 9.0,  0.14, 0.55, t);
    vec3 w3 = gerstner(p.xz, vec2(-0.7, 0.40), 24.0, 0.12, 0.28, t);

    // Chaotic noise field — fades as uFlow rises
    float chopAmp = mix(0.35, 0.12, uFlow) + uChaos * 0.55;
    float chop = fbm(p.xz * 0.22 + vec2(t * 0.15, -t * 0.09)) - 0.5;
    float chop2 = fbm(p.xz * 0.55 - vec2(t * 0.22, t * 0.18)) - 0.5;

    vec3 disp = (w1 + w2 + w3) * mix(0.55, 1.0, uFlow);
    disp.y += chop * chopAmp * reduce;
    disp.y += chop2 * (chopAmp * 0.45) * reduce;

    // Pointer dimple — subtle
    float d = length(p.xz - uPointer * 20.0);
    disp.y += exp(-d * d * 0.02) * 0.25 * (1.0 - uReduced);

    vec3 displaced = p + disp * reduce;

    // Approximate normal from finite differences
    vec2 e = vec2(0.15, 0.0);
    float hL = displaced.y - (disp.y - chop * chopAmp * 0.02);
    float hR = displaced.y + (disp.y + chop * chopAmp * 0.02);
    vNormal = normalize(vec3(hL - hR, 2.0 * e.x, 0.0));

    vElevation = disp.y;
    vCrest = smoothstep(0.18, 0.7, disp.y);

    vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
    vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`;

export const oceanFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScrollProgress;
  uniform float uChaos;
  uniform float uFlow;
  uniform vec3  uDeep;
  uniform vec3  uShallow;
  uniform vec3  uCrest;
  uniform vec3  uAccent;

  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying float vElevation;
  varying float vCrest;
  varying vec3 vNormal;

  void main(){
    // Depth mix based on elevation
    float depth = smoothstep(-1.0, 1.2, vElevation);
    vec3 base = mix(uDeep, uShallow, depth);

    // Crest highlight
    float crest = smoothstep(0.35, 1.0, vCrest);
    base = mix(base, uCrest, crest * 0.6);

    // Energy flow accent — organised stripes emerge as uFlow rises
    float stripe = sin((vWorldPos.x + vWorldPos.z) * 0.22 - uTime * 0.8) * 0.5 + 0.5;
    stripe = pow(stripe, 4.0);
    base += uAccent * stripe * uFlow * 0.35;

    // Chaos flicker
    float flicker = fract(sin(dot(vWorldPos.xz, vec2(12.9898, 78.233))) * 43758.5453);
    base += vec3(flicker) * uChaos * 0.03;

    // Vignette fade toward edges (fragment y grows far from camera)
    float dist = length(vWorldPos.xz) * 0.028;
    float vignette = smoothstep(1.4, 0.2, dist);
    base *= vignette;

    // Subtle rim toward horizon
    base += uAccent * (1.0 - vignette) * 0.08;

    gl_FragColor = vec4(base, 1.0);
  }
`;
