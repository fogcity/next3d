@group(0) @binding(0) var<storage> modelViews : array<mat4x4<f32>>;
@group(0) @binding(1) var<uniform> cameraProjection : mat4x4<f32>;
@group(0) @binding(2) var<storage> lightProjection : array<mat4x4<f32>>;
@group(0) @binding(3) var<storage> colors : array<vec4<f32>>;
@group(0) @binding(4) var<storage> options : array<f32>;

struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal : vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) shadowPos: vec3<f32>,
    @location(4) fragColor: vec4<f32>
};

@vertex
fn main(
    @builtin(instance_index) index : u32,
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>,
) -> VertexOutput {
     let useShadow = options[0];
    let modelview = transpose(modelViews[index]);
    let pos = vec4<f32>(position, 1.0);

    let posFromCamera: vec4<f32> = transpose(cameraProjection) * modelview * pos;
    let posFromLight: vec4<f32> = transpose(lightProjection[0]) * modelview * pos;

    var output : VertexOutput;
    output.Position = posFromCamera;
    output.fragPosition = (modelview * pos).xyz;
    output.fragNormal =  (modelview * vec4<f32>(normal, 0.0)).xyz;
    output.fragUV = uv;
    output.fragColor = colors[index];


     // 修复uv坐标
    output.shadowPos = vec3<f32>(posFromLight.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), posFromLight.z);
    return output;
}