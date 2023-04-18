@group(0) @binding(0) var<storage> modelViews : array<mat4x4f>;
@group(0) @binding(1) var<storage> lightProjection : array<mat4x4f>;

@vertex
fn main(
    @builtin(instance_index) index : u32,
    @location(0) position : vec3f,
    @location(1) normal : vec3f,
    @location(2) uv : vec2f,
) -> @builtin(position) vec4f {
    let modelview = transpose(modelViews[index]);
    let pos = vec4(position, 1.0);
    return transpose(lightProjection[0]) * modelview * pos;
}