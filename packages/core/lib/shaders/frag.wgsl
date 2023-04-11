@group(1) @binding(0) var<storage> pointLight : array<f32>;
@group(1) @binding(1) var shadowMap: texture_depth_2d;
@group(1) @binding(2) var shadowSampler: sampler_comparison;
@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) shadowPos: vec3<f32>,
    @location(4) fragColor: vec4<f32>
) -> @location(0) vec4<f32> {

    let objectColor = fragColor.rgb;
    
    // 环境光处理，初始化光照结果为环境光
    let ambientColor = vec3(1.0, 1.0, 1.0);
    let ambientIntensity = 0.5;
    let ambientLight = ambientColor * ambientIntensity;
    var lightResult = ambientLight;

    let lightNumber = arrayLength(&pointLight);
    

    // 对比深度，判断是否在阴影中
    var shadow = textureSampleCompare(
                shadowMap, 
                shadowSampler,
                shadowPos.xy , 
                shadowPos.z - 0.005  
            ); 

    if(lightNumber > 0){
      // 循环光照组计算颜色
      for(var i:u32 = 0; i < lightNumber * 8; i += 8) {
           
            // 拿到每个点光源的位置，颜色，强度，影响半径
            var pointLightPosition = vec3(pointLight[i],pointLight[i+1],pointLight[i+2]);
            var pointLightColor = vec3(pointLight[i+3],pointLight[i+4],pointLight[i+5]);
            var pointLightIntensity = pointLight[i+6];
            var pointLightRadius = pointLight[i+7];
            
            // 计算距离
            var L = pointLightPosition - fragPosition;
            var distance = length(L);
            if(distance <= pointLightRadius) {

                // 如果在阴影中，则反射黑色，否则反射本来的漫反射
                var diffuse = max(dot(normalize(L), fragNormal), 0.0);
                // 计算距离衰减
                var diffuseWithDistance = pow(1.0 - distance / pointLightRadius, 2.0);
                // 计算光强效果
                var diffuseWithDistanceAndIntensity = pointLightColor * pointLightIntensity * diffuse * diffuseWithDistance;
                // 该片源累加每个点光源的结果
                lightResult += diffuseWithDistanceAndIntensity;
            }
     }
   }
       return vec4<f32>(objectColor * lightResult, 1.0);
}