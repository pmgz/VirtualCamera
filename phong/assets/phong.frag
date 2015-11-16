#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float N;
uniform float Ka;
uniform float Kd;
uniform float Ks;
uniform vec4 ambientColor;
uniform vec4 diffuseColor;
uniform vec4 specularColor;

struct Ray {
	vec3 o;
	vec3 d;
};

struct Sphere {
	vec3 c;
	float r;
};

vec3 camera = vec3(0.0, 0.0, -1.0);

Sphere sphere = Sphere(vec3(0.0, 0.0, 2.0), 1.0);

vec3 light = vec3(0., 0., 0.);

vec4 phong(vec3 surface, vec3 center, vec3 light) {

	vec3 n = normalize(surface - center);
	vec3 l = normalize(light - surface);
	vec3 v = normalize(camera - surface);
    
    vec3 r = 2.0 * dot(n, l) * n - l;
	
    return ambientColor * Ka + diffuseColor * max(0.0, dot(n,l)) * Kd + specularColor * pow(max(0.0, dot(r, v)), N) * Ks;
}

float intersectSphere(Ray ray, Sphere sphere) {

	vec3 co = ray.o - sphere.c;

	float discriminant = dot(co, ray.d) * dot(co, ray.d) - (dot(co, co) - sphere.r * sphere.r);

	if (discriminant >= 0.0)
		return -dot(ray.d, co) - sqrt(discriminant);
	else
		return -1.0;
}

void main() {

  	vec2 fragCoord = gl_FragCoord.xy;

	vec4 viewCoord = vec4(fragCoord,0.,1.);

	float x = viewCoord.x / resolution.x;
	float y = viewCoord.y / resolution.y;
	float z = viewCoord.z;

	float posPixelX = x * 2.0 - 1.0;
	float posPixelY = y * 2.0 - 1.0;
    posPixelX *= (resolution.x / resolution.y);
	
	light.xy = (mouse.xy / resolution.xy) * 2.0 - 1.0;
	light.x *= (resolution.x / resolution.y);

	vec3 posPixel = vec3(posPixelX, posPixelY, 0);

	vec3 ray = normalize(posPixel - camera);
	
	float cameraToSphere = intersectSphere(Ray(camera, ray), sphere);
    
	if (cameraToSphere >= 0.0)
		gl_FragColor = phong(camera + cameraToSphere * ray, sphere.c, light);
	else
		gl_FragColor = vec4(0, 0, 0, 1);
}

