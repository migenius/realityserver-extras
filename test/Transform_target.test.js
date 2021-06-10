/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Transform_target } from '../src/Transform_target';
import { Transform } from '../src/Transform';
import { Vector3, Matrix4x4 } from '@migenius/realityserver-client';

test('default', () => {
    const transform = new Transform_target();
    const Identity = new Matrix4x4();

    expect(transform.world_to_obj).toBeMatrix4x4(Identity);
    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0));
    expect(transform.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.z_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.translation).toBeVector3(new Vector3(0, 0, 0));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(transform.up_direction).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.target_point).toBeVector3(new Vector3(0, 0, -1));
    expect(transform.follow_target_point).toBe(true);

    // should be the same
    transform.target_point = new Vector3(0, 0, -1);

    expect(transform.world_to_obj).toBeMatrix4x4(Identity);
    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0));
    expect(transform.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.z_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.translation).toBeVector3(new Vector3(0, 0, 0));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(transform.up_direction).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.target_point).toBeVector3(new Vector3(0, 0, -1));
    expect(transform.follow_target_point).toBe(true);
});


test('z up', () => {
    const transform = new Transform_target(Transform.Z_AXIS);
    const z_up_matrix = new Matrix4x4(
        1, 0, 0, 0,
        0, 0, -1, 0,
        0, 1, 0, 0,
        0, 0 ,0, 1
    );

    expect(transform.world_to_obj).toBeMatrix4x4(z_up_matrix);
    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0));
    expect(transform.y_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.z_axis).toBeVector3(new Vector3(0, -1, 0));
    expect(transform.translation).toBeVector3(new Vector3(0, 0, 0));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(transform.up_direction).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.target_point).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.follow_target_point).toBe(true);

    // should be the same
    transform.target_point = new Vector3(0, 1, 0);

    expect(transform.world_to_obj).toBeMatrix4x4(z_up_matrix);
    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0));
    expect(transform.y_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.z_axis).toBeVector3(new Vector3(0, -1, 0));
    expect(transform.translation).toBeVector3(new Vector3(0, 0, 0));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(transform.up_direction).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.target_point).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.follow_target_point).toBe(true);
});

test('set target', () => {
    const transform = new Transform_target();
    transform.target_point = new Vector3(2, 0, 0);

    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0, xy: 0, xz: -1, xw: 0,
        yx: 0, yy: 1, yz: 0, yw: 0,
        zx: 1, zy: 0, zz: 0, zw: 0,
        wx: 0, wy: 0, wz: 0, ww: 1
    }));
    expect(transform.x_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.z_axis).toBeVector3(new Vector3(-1, 0, 0));
    expect(transform.translation).toBeVector3(new Vector3(0, 0, 0));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(transform.up_direction).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.target_point).toBeVector3(new Vector3(2, 0, 0));
    expect(transform.follow_target_point).toBe(true);

    const translate = transform.clone();
    translate.translate(3, 4, 2);
    expect(translate.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0, xy: 0, xz: -1, xw: 0,
        yx: 0, yy: 1, yz: 0, yw: 0,
        zx: 1, zy: 0, zz: 0, zw: 0,
        wx: -3, wy: -4, wz: -2, ww: 1
    }));
    expect(translate.x_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(translate.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(translate.z_axis).toBeVector3(new Vector3(-1, 0, 0));
    expect(translate.translation).toBeVector3(new Vector3(-2, 4, 3));
    expect(translate.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(translate.up_direction).toBeVector3(new Vector3(0, 1, 0));
    expect(translate.target_point).toBeVector3(new Vector3(0, 4, 3));
});


test('translate', () => {
    const transform = new Transform_target();
    transform.target_point = new Vector3(2, 0, 0);

    const translate = transform.clone();
    translate.translate(3, 4, 2);
    expect(translate.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0, xy: 0, xz: -1, xw: 0,
        yx: 0, yy: 1, yz: 0, yw: 0,
        zx: 1, zy: 0, zz: 0, zw: 0,
        wx: -3, wy: -4, wz: -2, ww: 1
    }));
    expect(translate.x_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(translate.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(translate.z_axis).toBeVector3(new Vector3(-1, 0, 0));
    expect(translate.translation).toBeVector3(new Vector3(-2, 4, 3));
    expect(translate.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(translate.up_direction).toBeVector3(new Vector3(0, 1, 0));
    expect(translate.target_point).toBeVector3(new Vector3(0, 4, 3));
});

test('translate world', () => {
    const transform = new Transform_target();
    transform.target_point = new Vector3(2, 0, 0);

    const translate = transform.clone();
    translate.translate(3, 4, 2, false);
    expect(translate.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0, xy: 0, xz: -1, xw: 0,
        yx: 0, yy: 1, yz: 0, yw: 0,
        zx: 1, zy: 0, zz: 0, zw: 0,
        wx: -2, wy: -4, wz: 3, ww: 1
    }));
    expect(translate.x_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(translate.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(translate.z_axis).toBeVector3(new Vector3(-1, 0, 0));
    expect(translate.translation).toBeVector3(new Vector3(3, 4, 2));
    expect(translate.scale).toBeVector3(new Vector3(1, 1, 1));
    expect(translate.up_direction).toBeVector3(new Vector3(0, 1, 0));
    expect(translate.target_point).toBeVector3(new Vector3(5, 4, 2));
});

function default_transform() {
    const start_matrix = {
        xx: 0.9063078165054321, xy: -0.2716537714004517, xz: 0.3237443566322327, xw: 0,
        yx: -2.775557561562891e-17, yy: 0.7660444378852844, yz: 0.6427876353263855, yw: 0,
        zx: -0.4226182699203491, zy: -0.5825634002685547, zz: 0.6942720413208008, zw: 0,
        wx: -0.0005766593385487795, wy: -0.01665955409407616, wz: -0.2741777300834656, ww: 1,
    };
    const transform = new Transform_target();
    transform.world_to_obj = start_matrix;
    transform.target_point = new Vector3(0.03, 0.05, -0.05);

    return transform;
}

test('orbit', () => {
    const transform = default_transform();

    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0.9728992178311853, xy: -0.11704550447589564, xz: 0.1994178071924648, xw: 0,
        yx: 0, yy: 0.8624234828904445, yz: 0.5061874516017907, yw: 0,
        zx: -0.23122956546140025, zy: -0.4924693757393432, zz: 0.8390511319433599, zw: 0,
        wx: -0.040748454808005576, wy: -0.0642332777972125, wz: -0.26394118395599914, ww: 1
    }));

    transform.orbit_around_target_point(-0.8, 0.5, 0);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0.7429420387710913, xy: -0.6501646102760255, xz: 0.15913235551350965, xw: 0,
        yx: -3.5425957334767426e-9, yy: 0.23773957528487094, yz: 0.9713289321045518, yw: 0,
        zx: -0.6693557552054469, zy: -0.7216410976988443, zz: 0.176626722455445, zw: 0,
        wx: -0.055756048746275294, wy: -0.028464095340905004, wz: -0.31911091490516424, ww: 1
    }));
});

test('orbit and roll', () => {
    const transform = default_transform();

    transform.orbit_around_target_point(0.98, 1.23, 2.12);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0.37327304698731206, xy: 0.9093991655952729, xz: 0.18346768109787004, xw: 0,
        yx: -0.7355959007990843, yy: 0.1696201927126813, yz: 0.6558411857696166, yw: 0,
        zx: 0.5653016036775341, zy: -0.37976591189670345, zz: 0.7322649445664279, zw: 0,
        wx: 0.053846683814211566, wy: -0.05475128019832741, wz: -0.2762846762503992, ww: 1
    }));
});

test('z up and orbit', () => {
    const transform = default_transform();

    transform.up_direction = new Vector3(0, 0, 1);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: -0.930401730120916, xy: -0.30754700252572004, xz: 0.1994178071924648, xw: 0,
        yx: 0.36654143092971947, yy: -0.7806546248200151, yz: 0.5061874516017907, yw: 0,
        zx: 0, zy: 0.5440525691369965, zz: 0.8390511319433599, zw: 0,
        wx: 0.009584980357141518, wy: 0.07546176977362216, wz: -0.26394118395599914, ww: 1
    }));

    transform.orbit_around_target_point(-0.8, 0.5, 0);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: -0.9922336568509845, xy: 0.12125987078377337, xz: 0.027720280475225748, xw: 0,
        yx: -0.12438798258723625, yy: -0.9672809423746327, yz: -0.22112260921651583, yw: 0,
        zx: -2.0816681711721685e-17, zy: -0.22285336492040037, zz: 0.9748519773502308, zw: 0,
        wx: 0.03598640883489135, wy: 0.033583582749198405, wz: -0.2156347128432232, ww: 1
    }));
});

test('z up orbit and roll', () => {
    const transform = default_transform();

    transform.up_direction = new Vector3(0, 0, 1);

    transform.orbit_around_target_point(-0.8, 0.5, -0.45);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: -0.8480574915482921, xy: 0.41471086810976143, xz: 0.3298687419269467, xw: 0,
        yx: -0.4741287306631974, yy: -0.8718420621885362, yz: -0.122855058335201, yw: 0,
        zx: 0.23664411631926074, zy: -0.2605884004910587, zz: 0.935998529775014, zw: 0,
        wx: 0.06098036709557167, wy: 0.018121357041581035, wz: -0.23155521660960138, ww: 1
    }));
});

test('roll', () => {
    const transform = default_transform();

    transform.rotate(0, 0, Math.PI/2);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        xx: 0.11704550447589569, xy: 0.9728992178311852, xz: 0.1994178071924648, xw: 0,
        yx: -0.8624234828904443, yy: 0, yz: 0.5061874516017907, yw: 0,
        zx: 0.492469375739343, zy: -0.23122956546140033, zz: 0.8390511319433599, zw: 0,
        wx: 0.0642332777972125, wy: -0.04074845480800555, wz: -0.26394118395599914, ww: 1
    }));
});

/*
function outm(m) {
    console.log(
        `xx: ${m.xx}, xy: ${m.xy}, xz: ${m.xz}, xw: ${m.xw},\n`+
        `yx: ${m.yx}, yy: ${m.yy}, yz: ${m.yz}, yw: ${m.yw},\n`+
        `zx: ${m.zx}, zy: ${m.zy}, zz: ${m.zz}, zw: ${m.zw},\n`+
        `wx: ${m.wx}, wy: ${m.wy}, wz: ${m.wz}, ww: ${m.ww}`);
}
*/
