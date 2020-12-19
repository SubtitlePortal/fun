RGBA(`
        vec2 mirror(vec2 uv){
             const float count = 3.;
             float a = 3.1415/count/2.;
             float cs = cos(a), sn = sin(a);
             mat2 rot = mat2(cs, -sn, sn, cs); 
             for (float i = 0.0; i<count; i++ )
                 uv = abs(uv*rot);  
             return uv;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy/resolution - 0.5;
            uv.x *= resolution.x/resolution.y;
            vec2 p = uv;
            uv *= 2.4;
            
            for(float i = 1.; i<9.; i++) {
                uv = mirror(uv);
                uv -= vec2(0.31, 0.4)+length(p)*0.1;
           
            } 

            float d = length(uv);
            vec3 c;
            for(float i = 0.; i<11.; i++) {
                c.r += smoothstep(0.01, 0.0, abs(d-i*0.04))*
                smoothstep(0.5, 0.51, fract(-.01+length(p)-time*0.1 + atan(uv.x, uv.y)/6.283));
                c.g += smoothstep(0.01, 0.0, abs(d-i*0.04))*
                smoothstep(0.5, 0.51, fract(-.015+length(p)-time*0.1 + atan(uv.x, uv.y)/6.283));
                c.b += smoothstep(0.01, 0.0, abs(d-i*0.04))*
                smoothstep(0.5, 0.51, fract(-.02+length(p)-time*0.1 + atan(uv.x, uv.y)/6.283));
            }
            
            
            gl_FragColor = vec4(vec3(c), 1.0);
        }
`,{record:1})