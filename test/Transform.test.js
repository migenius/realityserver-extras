/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Transform } from '../src/Transform';
import { Vector3, Matrix4x4, Math as RS_math } from '@migenius/realityserver-client';
import { Quaternion } from '../src/Quaternion';
import { Euler } from '../src/Euler';

test('default', () => {
    const transform = new Transform();
    const Identity = new Matrix4x4();

    expect(transform.world_to_obj).toBeMatrix4x4(Identity);
    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0));
    expect(transform.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.z_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.translation).toBeVector3(new Vector3(0, 0, 0, 1));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));

});

test('set world_to_obj', () => {
    const transform = new Transform();

    transform.world_to_obj = new Matrix4x4({
        xx: 0.9063078165054321, xy: -0.2716537714004517, xz: 0.3237443566322327, xw: 0,
        yx: -2.775557561562891e-17, yy: 0.7660444378852844, yz: 0.6427876353263855, yw: 0,
        zx: -0.4226182699203491, zy: -0.5825634002685547, zz: 0.6942720413208008, zw: 0,
        wx: -0.0005766593385487795, wy: -0.01665955409407616, wz: -0.2741777300834656, ww: 1
    });

    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        ww: 1, wz: -0.2741777300834656, wy: -0.01665955409407616, wx: -0.0005766593385487795,
        zw: 0, zz: 0.6942720413208008, zy: -0.5825634002685547, zx: -0.4226182699203491,
        yw: 0, yz: 0.6427876353263855, yy: 0.7660444378852844, yx: -2.775557561562891e-17,
        xw: 0, xz: 0.3237443566322327, xy: -0.2716537714004517, xx: 0.9063078165054321 }));

    expect(transform.translation).toBeVector3(
        new Vector3(0.08476049553891127, 0.18900000243478815, 0.18040497944778802));
    expect(transform.x_axis).toBeVector3(new Vector3(0.9063077917371404, 5.185256700623759e-9, -0.42261825166046507));
    expect(transform.y_axis).toBeVector3(new Vector3(-0.27165378746517177, 0.7660444269818932, -0.5825634348685216));
    expect(transform.z_axis).toBeVector3(new Vector3(0.3237443704899228, 0.642787601163245, 0.6942720521286195));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));
});

test('set world_to_obj', () => {
    const transform = new Transform();

    transform.world_to_obj = new Matrix4x4({
        xx: 0.9063078165054321/2, xy: -0.2716537714004517/.2, xz: 0.3237443566322327/4, xw: 0,
        yx: -2.775557561562891e-17/2, yy: 0.7660444378852844/.2, yz: 0.6427876353263855/4, yw: 0,
        zx: -0.4226182699203491/2, zy: -0.5825634002685547/.2, zz: 0.6942720413208008/4, zw: 0,
        wx: -0.0005766593385487795, wy: -0.01665955409407616, wz: -0.2741777300834656, ww: 1
    });

    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        ww: 1, wz: -0.2741777300834656, wy: -0.01665955409407616, wx: -0.0005766593385487795,
        zw: 0, zz: 0.6942720413208008/4, zy: -0.5825634002685547/.2, zx: -0.4226182699203491/2,
        yw: 0, yz: 0.6427876353263855/4, yy: 0.7660444378852844/.2, yx: -2.775557561562891e-17/2,
        xw: 0, xz: 0.3237443566322327/4, xy: -0.2716537714004517/.2, xx: 0.9063078165054321/2 }));

    expect(transform.translation).toBeVector3(
        new Vector3(0.3551941184369366, 0.7075045663839591, 0.7589872707100626));
    expect(transform.x_axis).toBeVector3(new Vector3(0.9063077917371404, 5.185256700623759e-9, -0.42261825166046507));
    expect(transform.y_axis).toBeVector3(new Vector3(-0.27165378746517177, 0.7660444269818932, -0.5825634348685216));
    expect(transform.z_axis).toBeVector3(new Vector3(0.3237443704899228, 0.642787601163245, 0.6942720521286195));
    expect(transform.scale).toBeVector3(new Vector3(2, 0.2, 4));
});

test('set translation', () => {
    const transform = new Transform();
    const translate = new Vector3(-2.3, 5.4, 103.4);
    transform.translation = translate;

    expect(transform.translation).toBeVector3(translate);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        2.3, -5.4, -103.4, 1
    ));
});

test('set scale', () => {
    const transform = new Transform();
    const scale = new Vector3(-2.3, 5.4, 103.4);
    transform.scale = scale;

    expect(transform.scale).toBeVector3(scale);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1/-2.3, 0, 0, 0,
        0, 1/5.4, 0, 0,
        0, 0, 1/103.4, 0,
        0, 0, 0, 1
    ));

    const new_scale = transform.scale.clone();
    expect(transform.scale).toBeVector3(new_scale);
    new_scale['x'] = new_scale['x'] * -1;
    transform.scale = new_scale;

    expect(transform.scale).toBeVector3(new_scale);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1/2.3, 0, 0, 0,
        0, 1/5.4, 0, 0,
        0, 0, 1/103.4, 0,
        0, 0, 0, 1
    ));

});

test('set mirror scale', () => {
    const transform = new Transform();
    const scale = transform.scale.clone();
    scale.x = -1;
    transform.scale = scale;

    expect(transform.scale).toBeVector3(scale);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        -1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ));
});

test('set unit scale', () => {
    const transform = new Transform();
    const scale = new Vector3(1, 1, 1);
    transform.scale = scale;

    expect(transform.scale).toBeVector3(scale);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ));
});

test('set rotate', () => {
    const transform = new Transform();
    transform.set_rotation(RS_math.radians(45), 0, 0);

    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0, 1));
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1, 0, 0, 0,
        0, 0.7071067811865475, -0.7071067811865475, 0,
        0, 0.7071067811865475, 0.7071067811865475, 0,
        0, 0, 0, 1
    ));

    const transform2 = new Transform();
    transform2.set_rotation(RS_math.radians(129), RS_math.radians(-32), RS_math.radians(64));

    expect(transform2.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        0.3717598164443862, 0.3850973914558067, 0.84468611801732, 0,
        0.7622205798007392, -0.6460214145897677, -0.04094043990555752, 0,
        0.529919264233205, 0.6590571530492396, -0.533693959502232, 0,
        0, 0, 0, 1
    ));
});

test('quaternion', () => {
    const e1 = new Vector3(RS_math.radians(23), RS_math.radians(18), RS_math.radians(-143));
    let transform = new Transform();
    let q = new Quaternion(new Euler(e1));
    let transform2 = new Transform();
    transform.rotation = q;
    transform2.set_rotation(e1.x, e1.y, e1.z);
    expect(transform.world_to_obj).toBeMatrix4x4(transform2.world_to_obj);
    let q2 = transform.rotation;
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        -0.75954750597518172, 0.45754435455299386, -0.46232104622606757, -0,
        -0.57236009937307408, -0.8078125490385939, 0.14086448190162718, -0,
        -0.30901699437494751, 0.37160738586908265, 0.87545213915725884, 0,
        0, 0, 0, 1));
    expect(q2).toBeQuaternion(q);

    // matrix from TRS
    const t = new Vector3(4, -3, 12);
    const r = new Quaternion(new Euler(RS_math.radians(98), RS_math.radians(-12), RS_math.radians((197))));
    const s = new Vector3(4, 0.2, 8);
    transform = new Transform();
    transform.translation = t;
    transform.rotation = r;
    transform.scale = s;
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        -0.23385180065389269, 0.78100845934931484, -0.039649715626325979, -0,
        -0.07149567037424942, 0.96643907049531419, 0.11731725994635984, 0,
        0.051977922704439829, 4.843141677614331, -0.017016479348846449, 0,
        0.097185119039544521, -58.342416757283289, 0.71474839453054073, 1));
    // and the inverse operation
    transform = new Transform();
    transform.world_to_obj = new Matrix4x4(
        -0.23385180065389269, 0.78100845934931484, -0.039649715626325979, -0,
        -0.07149567037424942, 0.96643907049531419, 0.11731725994635984, 0,
        0.051977922704439829, 4.843141677614331, -0.017016479348846449, 0,
        0.097185119039544521, -58.342416757283289, 0.71474839453054073, 1);
    expect(transform.translation).toBeVector3(t);
    expect(transform.rotation).toBeQuaternion(r);
    expect(transform.scale).toBeVector3(s);
});
