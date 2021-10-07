/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
 import { Camera } from '../src/Camera';
 import { Vector4 } from '@migenius/realityserver-client';


 test('perp view 1', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":1.3779499530792236,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.7071067690849304,"xy":0.276172399520874,"xz":-0.6509445905685425,"xw":0,"yx":-0.7071067690849304,"yy":0.276172399520874,"yz":-0.6509445905685425,"yw":0,"zx":0,"zy":0.9205746650695801,"zz":0.39056679606437683,"zw":0,"wx":0.2783747911453247,"wy":-0.05595927685499191,"wz":-2.0305066108703613,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-2.30916);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(735.40,159.86,-2.01928);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(516.13,369.79,-2.59904);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp view 2', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.40914504666069357,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.26082546499653264,"xy":-0.12858248262334687,"xz":0.9567845948461243,"xw":0,"yx":0.8776697639244628,"yy":0.44436609257364834,"yz":-0.17953987257691023,"yw":0,"zx":-0.4020768932350861,"zy":0.8865694690296112,"zz":0.2287549242947354,"zw":0,"wx":-0.17999174423638423,"wy":-0.1201119411091207,"wz":-0.9749603063395884,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(674.93,279.34,-1.05875);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(563.04,206.74,-1.09652);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(795.11,357.31,-1.02099);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp view 3', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.417319966096916,"focal":2.4713910636315592,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.10270959261948519,"xy":0.3507569067677769,"xz":0.9308179845373998,"xw":0,"yx":-0.7582951481508095,"yy":-0.6332313660278402,"yz":0.15494542546395282,"yw":0,"zx":0.6437705036808219,"zy":-0.6899200428937937,"zz":0.331015943001106,"zw":0,"wx":0.2535354078870397,"wy":0.24044107121198685,"wz":-1.6823220903387999,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(578.13,445.18,-1.6403);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(941.42,795.87,-1.81403);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(128.76,11.40,-1.46657);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 4', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.417319966096916,"focal":0.844548082093984,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.6026213945306114,"xy":0.38501021269236535,"xz":-0.6990108803499903,"xw":0,"yx":0.1883923296067144,"yy":-0.7825311577804065,"yz":-0.593426685882355,"yw":0,"zx":-0.7754721407651661,"zy":-0.48929966550557724,"zz":0.3990367408932108,"zw":0,"wx":-0.20050476217977767,"wy":0.3107166070790953,"wz":-1.3838031560380641,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(658.35,415.11,-1.6403);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(674.04,603.94,-1.36896);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(647.12,279.88,-1.91163);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 5', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.417319966096916,"focal":6.742449360607215,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.1972060679092968,"xy":-0.8673305473388689,"xz":0.4570005527078021,"xw":0,"yx":0.9658430403021504,"yy":-0.2518161842523538,"yz":-0.06113252899929477,"yw":0,"zx":0.16810202422708115,"zy":0.4293348786792038,"zz":0.8873641491694081,"zw":0,"wx":-0.8059327730473866,"wy":0.37397931207266727,"wz":-9.402013551165314,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(394.06,575.36,-9.47694);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(137.72,679.29,-9.56014);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(654.95,469.59,-9.39374);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 6', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.417319966096916,"focal":6.742449360607215,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.6226916728346241,"xy":0.19210763724810268,"xz":0.7585195699590147,"xw":0,"yx":-0.6046062950862979,"yy":-0.7334834164987374,"yz":-0.3105731532668159,"yw":0,"zx":0.4966972162658779,"zy":-0.6519965370227948,"zz":0.5728828892677802,"zw":0,"wx":0.3858027488624729,"wy":0.2795493460191764,"wz":-9.32184428329067,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(783.85,419.29,-9.47695);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(967.80,641.35,-9.46885);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(600.21,197.61,-9.48505);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 7', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.012369707226753235,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.6690679050170214,"xy":0.23678627439386726,"xz":0.7044732600754816,"xw":0,"yx":-0.5839232741497437,"yy":-0.7538716250198212,"yz":-0.3011869683295471,"yw":0,"zx":0.4597646869014654,"zy":-0.6128724085437638,"zz":0.642655636674231,"zw":0,"wx":-0.05991355151396158,"wy":-0.09124068906458935,"wz":-0.041725882217439884,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(680.40,377.63,-0.197133);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(696.46,397.20,-0.192502);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(665.08,358.96,-0.201763);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp view 8', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":1.3779499530792236,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.9254974560732596,"xy":0.2761724298823595,"xz":-0.2591972157401069,"xw":0,"yx":-0.33472935765606215,"yy":0.2761723838116716,"yz":-0.9009357510131336,"yw":0,"zx":-0.1772304486154559,"zy":0.9205746696145916,"zz":0.348039888638486,"zw":0,"wx":0.07006172404931107,"wy":-0.047956884188731765,"wz":-1.0736690249684648,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(780.47,400.00,-1.06274);
    let result = camera.project_point_to_pixel(pt, {x: 1403, y: 800}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(711.41,190.89,-0.960837);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 800}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(837.45,572.51,-1.16464);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 800}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp view 9', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.7086600077951039,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5642838342107322,"xy":-0.7420322141608612,"xz":0.36190054071776917,"xw":0,"yx":0.06770034754320078,"yy":0.47847261333074315,"yz":0.8754888923837327,"yw":0,"zx":-0.8228002998190472,"zy":-0.46952345030183795,"zz":0.32023020801511826,"zw":0,"wx":-0.23961084683488762,"wy":-0.09048421256931957,"wz":-1.1981125501351924,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(535.37,333.34,-1.17589);
    let result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(556.71,380.97,-1.34741);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(506.76,269.44,-1.00436);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 10', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":4.019010615971801,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5642838342107322,"xy":-0.7420322141608612,"xz":0.36190054071776917,"xw":0,"yx":0.06770034754320078,"yy":0.47847261333074315,"yz":0.8754888923837327,"yw":0,"zx":-0.8228002998190472,"zy":-0.46952345030183795,"zz":0.32023020801511826,"zw":0,"wx":0.11779316576266789,"wy":0.08061347452464321,"wz":-1.1981125433475224,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(968.57,598.47,-1.17589);
    let result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(935.62,794.91,-1.34741);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(1012.77,334.93,-1.00436);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 11', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":4.019010615971801,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5642838342107322,"xy":-0.7420322141608612,"xz":0.36190054071776917,"xw":0,"yx":0.06770034754320078,"yy":0.47847261333074315,"yz":0.8754888923837327,"yw":0,"zx":-0.8228002998190472,"zy":-0.46952345030183795,"zz":0.32023020801511826,"zw":0,"wx":0.09878231359557298,"wy":0.04259176718640981,"wz":-1.1981125438990983,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(904.25,469.83,-1.17589);
    let result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(879.48,682.65,-1.34741);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(937.47,184.32,-1.00436);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 12', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.8751222283972597,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5424720668067528,"xy":-0.7738180211822188,"xz":-0.327001190504829,"xw":0,"yx":0.2228061420235367,"yy":0.5078409994548019,"yz":-0.8321388652819446,"yw":0,"zx":0.8099885158459632,"zy":0.37855423430434126,"zz":0.4479010141540394,"zw":0,"wx":0.017102649268967554,"wy":0.0005385062542419703,"wz":-1.192018997103153,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(745.65,415.60,-1.17589);
    let result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(619.44,415.88,-1.08291);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(853.36,415.36,-1.26887);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 13', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.8751222283972597,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.8880396359240439,"xy":-0.3862498677364859,"xz":-0.24939244551355474,"xw":0,"yx":0.37829275636492227,"yy":0.9221245798704181,"yz":-0.08112304560516924,"yw":0,"zx":0.26130463352391947,"zy":-0.022302865639097263,"zz":0.9649987812308495,"zw":0,"wx":-0.019417074410045424,"wy":0.015599458315809856,"wz":-0.36710605304342003,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(696.38,452.64,-0.320508);
    let result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(295.23,309.91,-0.369216);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(1241.32,646.52,-0.271798);
    result = camera.project_point_to_pixel(pt, {x: 1403, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 14', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.8751222283972597,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.8880396359240439,"xy":-0.3862498677364859,"xz":-0.24939244551355474,"xw":0,"yx":0.37829275636492227,"yy":0.9221245798704181,"yz":-0.08112304560516924,"yw":0,"zx":0.26130463352391947,"zy":-0.022302865639097263,"zz":0.9649987812308495,"zw":0,"wx":-0.019417074410045424,"wy":0.015599458315809856,"wz":-0.36710605304342003,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(341.49,426.07,-0.320508);
    let result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(144.77,356.08,-0.369216);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(608.71,521.14,-0.271798);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 15', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.8751222283972597,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.8803083302344559,"xy":-0.44041094134857534,"xz":0.17633888555928603,"xw":0,"yx":0.35260026269868855,"yy":0.3587344133890822,"yz":-0.8642816733444871,"yw":0,"zx":0.31738023639790336,"zy":0.8230115080205233,"zz":0.4710859526085196,"zw":0,"wx":-0.02201074392632128,"wy":-0.022554975251209707,"wz":-0.338849602654634,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(341.49,426.07,-0.320508);
    let result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(84.19,334.41,-0.285133);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(547.64,499.50,-0.355882);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 16', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":2.4713911454974777,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.8803083302344559,"xy":-0.44041094134857534,"xz":0.17633888555928603,"xw":0,"yx":0.35260026269868855,"yy":0.3587344133890822,"yz":-0.8642816733444871,"yw":0,"zx":0.31738023639790336,"zy":0.8230115080205233,"zz":0.4710859526085196,"zw":0,"wx":-0.02201074392632128,"wy":-0.022554975251209707,"wz":-0.338849602654634,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(336.91,472.70,-0.320508);
    let result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(-389.71,213.87,-0.285133);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(919.09,680.08,-0.355882);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 17', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.18988487759218642,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.8803083302344559,"xy":-0.44041094134857534,"xz":0.17633888555928603,"xw":0,"yx":0.35260026269868855,"yy":0.3587344133890822,"yz":-0.8642816733444871,"yw":0,"zx":0.31738023639790336,"zy":0.8230115080205233,"zz":0.4710859526085196,"zw":0,"wx":-0.02201074392632128,"wy":-0.022554975251209707,"wz":-0.338849602654634,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(343.46,406.05,-0.320508);
    let result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(287.63,386.16,-0.285133);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(388.19,421.98,-0.355882);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp view 18', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.18988487759218642,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.8803083302344559,"xy":-0.44041094134857534,"xz":0.17633888555928603,"xw":0,"yx":0.35260026269868855,"yy":0.3587344133890822,"yz":-0.8642816733444871,"yw":0,"zx":0.31738023639790336,"zy":0.8230115080205233,"zz":0.4710859526085196,"zw":0,"wx":-0.029363827519325238,"wy":-0.046524110358082335,"wz":-0.1539008863825819,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(337.71,397.32,-0.135559);
    let result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(176.79,337.64,-0.100184);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(432.03,432.30,-0.170933);
    result = camera.project_point_to_pixel(pt, {x: 688, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp view 19', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.7086600077951039,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":-0.8185334239036892,"xy":-0.4018066808378163,"xz":0.41055379289187055,"xw":0,"yx":0.48509910866510625,"yy":-0.10065434295065281,"yz":0.8686470469531608,"yw":0,"zx":-0.30770408628449036,"zy":0.9101759244358382,"zz":0.27730502906757104,"zw":0,"wx":0.013530667981224802,"wy":-0.0750034113375005,"wz":-0.21356021802468905,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(547.47,310.64,-0.19338);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(651.53,317.59,-0.365961);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(-1283.5,188.51,-0.0207992);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 20', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.7086600077951039,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":-0.8185334239036892,"xy":-0.4018066808378163,"xz":0.41055379289187055,"xw":0,"yx":0.48509910866510625,"yy":-0.10065434295065281,"yz":0.8686470469531608,"yw":0,"zx":-0.30770408628449036,"zy":0.9101759244358382,"zz":0.27730502906757104,"zw":0,"wx":0.013530667981224802,"wy":-0.0750034113375005,"wz":-0.21356021802468905,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(547.47,310.64,-0.19338);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(651.53,317.59,-0.365961);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(-1283.5,188.51,-0.0207992);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 21', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.7086600077951039,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.41720944279113276,"xy":0.12424939481693259,"xz":0.9002769148402943,"xw":0,"yx":0.9087678543982567,"yy":-0.066612924787241,"yz":-0.4119510345144844,"yw":0,"zx":0.008785422565355831,"zy":0.9900125883453598,"zz":-0.14070540129150141,"zw":0,"wx":-0.05571143996820858,"wy":-0.05257299788777203,"wz":-0.47720746226185284,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(494.44,396.30,-0.484478);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(340.08,296.65,-0.530545);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(681.24,516.88,-0.438412);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 22', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.7086600077951039,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.4064165803120903,"xy":-0.675625957519312,"xz":-0.615105868711738,"xw":0,"yx":0.740252940333279,"yy":-0.15114358866932542,"yz":0.6551192624895369,"yw":0,"zx":-0.5355847865340383,"zy":-0.7215852687476606,"zz":0.43870686155570626,"zw":0,"wx":-0.027703842096294815,"wy":0.03463046937366574,"wz":-0.508727264862898,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(494.44,396.30,-0.484478);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(411.32,565.63,-0.526676);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(593.41,194.65,-0.442281);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp view 23', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":2.4713911454974777,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.25961922205557547,"xy":-0.585009768555095,"xz":-0.7683499016917404,"xw":0,"yx":0.6776304897916213,"yy":0.6772293085320756,"yz":-0.28666604167141124,"yw":0,"zx":0.6880513751424231,"zy":-0.44623329470541495,"zz":0.5722422540386705,"zw":0,"wx":0.09744419271490834,"wy":0.009634830487594812,"wz":-0.14641395854122397,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(2694.45,248.32,-0.121833);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(-732.9,1239.56,-0.050516);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(3590.83,-10.93,-0.193151);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});



test('persp +z', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":1,"yz":0,"yw":0,"zx":0,"zy":0,"zz":1,"zw":0,"wx":0,"wy":-0.3936814069747925,"wz":-0.6263541301939584,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.683671);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(567.07,94.49,-0.755005);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(667.40,504.27,-0.612337);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp -z', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":-1,"yz":0,"yw":0,"zx":0,"zy":0,"zz":-1,"zw":0,"wx":0,"wy":0.3936814069747925,"wz":-0.7409883832786179,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.683671);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(556.60,504.27,-0.612337);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(656.93,94.49,-0.755005);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp -y', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":0,"yz":-1,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":0,"wy":0.05731713026762009,"wz":-0.18566787306006444,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.579349);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(430.82,143.38,-0.187224);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(646.92,303.95,-0.971475);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp -x', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0,"xy":0,"xz":-1,"xw":0,"yx":-1,"yy":0,"yz":0,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":0.3936814069747925,"wy":0.05731713026762009,"wz":-0.3868725785207938,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.386873);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(1088.34,191.35,-0.290873);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(325.07,330.20,-0.482873);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp y', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":0,"yz":1,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":0,"wy":0.05731713026762009,"wz":-0.9730306572073271,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.57935);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(646.92,252.05,-0.971475);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(430.82,412.63,-0.187224);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp x', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0,"xy":0,"xz":1,"xw":0,"yx":1,"yy":0,"yz":0,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":-0.3936814069747925,"wy":0.05731713026762009,"wz":-0.3868725785207938,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.386873);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(325.07,225.80,-0.482873);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(1088.34,364.65,-0.290873);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp off screen', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.9070434468360604,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.8190278182312938,"xy":-0.11051578884766888,"xz":-0.5630094967037983,"xw":0,"yx":-0.49310646762420984,"yy":-0.36607921304628394,"yz":0.7891970738431484,"yw":0,"zx":-0.2933248106629581,"zy":0.923997981702769,"zz":0.2453330089057499,"zw":0,"wx":0.450580333194969,"wy":0.2823874494067052,"wz":-0.6054763751946785,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(1305.08,494.37,-0.308846);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(1374.34,511.69,-0.581762);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(183.73,213.94,-0.03593);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp off screen 2', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":1.5197262902554434,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.8190278182312938,"xy":-0.11051578884766888,"xz":-0.5630094967037983,"xw":0,"yx":-0.49310646762420984,"yy":-0.36607921304628394,"yz":0.7891970738431484,"yw":0,"zx":-0.2933248106629581,"zy":0.923997981702769,"zz":0.2453330089057499,"zw":0,"wx":0.428000471567713,"wy":0.28190702681889124,"wz":-0.6054763751946785,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(1677.29,638.47,-0.308846);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(1838.34,668.45,-0.581762);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(-930.35,153.13,-0.03593);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp portrait aspect 1', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":1.5197262902554434,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.8190278182312938,"xy":-0.11051578884766888,"xz":-0.5630094967037983,"xw":0,"yx":-0.49310646762420984,"yy":-0.36607921304628394,"yz":0.7891970738431484,"yw":0,"zx":-0.2933248106629581,"zy":0.923997981702769,"zz":0.2453330089057499,"zw":0,"wx":0.3884304683764204,"wy":0.26422886117362815,"wz":-1.8878469054615563,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(396.92,427.46,-1.59122);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(488.17,454.74,-1.86413);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(267.89,388.90,-1.3183);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('persp portrait aspect 2', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":1.5197262902554434,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.034324007259928346,"xy":-0.10382956152926141,"xz":0.9940026582853105,"xw":0,"yx":0.9412677840497061,"yy":-0.3376496779731146,"yz":-0.002766527572400831,"yw":0,"zx":0.3359119248192557,"zy":0.9355277211912505,"zz":0.10932091129756193,"zw":0,"wx":-0.6507229376292109,"wy":0.24307042661742867,"wz":-1.1878935613760535,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(143.00,430.84,-1.19525);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(-43.00,467.00,-1.29739);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(363.77,387.91,-1.09311);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp portrait aspect 3', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.034324007259928346,"xy":-0.10382956152926141,"xz":0.9940026582853105,"xw":0,"yx":0.9412677840497061,"yy":-0.3376496779731146,"yz":-0.002766527572400831,"yw":0,"zx":0.3359119248192557,"zy":0.9355277211912505,"zz":0.10932091129756193,"zw":0,"wx":-0.5943280246260302,"wy":0.14187811263698766,"wz":-0.2397983072329664,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(44.88,350.95,-0.247153);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(-177.62,423.31,-0.349291);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(580.80,176.66,-0.145016);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp portrait aspect 4', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.19653375096477765,"xy":-0.6379538549468585,"xz":-0.7445732762395925,"xw":0,"yx":-0.9347083544077471,"yy":-0.35125332024042494,"yz":0.0542346496295671,"yw":0,"zx":-0.2961330392443224,"zy":0.6852999226459338,"zz":-0.6653339305111394,"zw":0,"wx":0.42222996492431397,"wy":0.19443531406590778,"wz":-0.560217238539549,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(347.21,408.55,-0.500731);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(602.23,510.77,-0.403058);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(175.43,339.70,-0.598404);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('persp portrait aspect 5', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":false,"aperture":1.4173200130462646,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.9420821566720657,"xy":-0.07205025500875079,"xz":0.3275514781425166,"xw":0,"yx":-0.07455781690521185,"yy":0.9072201332793092,"yz":0.41399608900458307,"yw":0,"zx":-0.32698981944167455,"zy":-0.4144398515176064,"zz":0.8493039900151476,"zw":0,"wx":0.22140814308075996,"wy":-0.12059277646210684,"wz":-0.6371361338635801,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(417.30,533.24,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(368.76,379.13,-0.777201);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(557.81,979.39,-0.268466);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 1', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":2.375133591364504,"focal":1.3779499530792236,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.7071067690849304,"xy":0.276172399520874,"xz":-0.6509445905685425,"xw":0,"yx":-0.7071067690849304,"yy":0.276172399520874,"yz":-0.6509445905685425,"yw":0,"zx":0,"zy":0.9205746650695801,"zz":0.39056679606437683,"zw":0,"wx":0.2783747911453247,"wy":-0.05595927685499191,"wz":-2.0305066108703613,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-2.30916);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(719.91,174.69,-2.01928);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(504.09,381.31,-2.59904);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('ortho view 2', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.0890035532162412,"focal":1.3779499530792236,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.26082546499653264,"xy":-0.12858248262334687,"xz":0.9567845948461243,"xw":0,"yx":0.8776697639244628,"yy":0.44436609257364834,"yz":-0.17953987257691023,"yw":0,"zx":-0.4020768932350861,"zy":0.8865694690296112,"zz":0.2287549242947354,"zw":0,"wx":-0.17999174423638417,"wy":-0.12011189308189418,"wz":-2.225364473842798,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(823.95,282.51,-2.30916);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(441.23,29.45,-2.34692);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(1206.68,535.56,-2.27139);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('ortho view 3', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":2.623547169927881,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.8280646746621275,"xy":0.1576701330917879,"xz":0.5380046689571806,"xw":0,"yx":-0.3114103760659724,"yy":-0.9273364554161281,"yz":-0.20753475916518205,"yw":0,"zx":0.46618930957610244,"zy":-0.3393924390975501,"zz":0.8169946756493979,"zw":0,"wx":0.12326770097964299,"wy":0.6886425056908092,"wz":-0.39430287489004473,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(686.10,582.55,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(775.94,781.43,-0.551381);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(596.26,383.66,-0.494285);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 4', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.2029016811810198,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.37619749234451383,"xy":-0.9252628145784638,"xz":-0.0486227442241983,"xw":0,"yx":0.028156832521746576,"yy":-0.041036947754119986,"yz":0.9987608133169045,"yw":0,"zx":-0.9261115699107518,"zy":-0.37710037582493106,"zz":0.010614473267774135,"zw":0,"wx":0.16012576597578299,"wy":0.18038890060018653,"wz":-0.9154184074186779,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(961.04,615.80,-0.522834);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(983.05,769.21,-0.910562);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(939.04,462.38,-0.135104);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 5', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":2.0230314232155724,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.11394533532839957,"xy":-0.9109128487442977,"xz":0.39655301580620445,"xw":0,"yx":0.7092667003937885,"yy":0.35408527041681487,"yz":0.6095608346356278,"yw":0,"zx":-0.695670356431692,"zy":0.21180523223275835,"zz":0.6864265004508765,"zw":0,"wx":-0.2669307779646026,"wy":-0.04081370195314331,"wz":-0.7234620316010427,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(736.10,459.32,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(570.41,413.30,-0.848892);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(901.80,505.35,-0.196774);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 6', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":7.420511978475119,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.06592676171807363,"xy":-0.6418006721826847,"xz":-0.7640326406923398,"xw":0,"yx":0.9707015781842268,"yy":0.21856553530403325,"yz":-0.09983904775419918,"yw":0,"zx":0.23106792979721413,"zy":-0.7350655290843655,"zz":0.6374061480380446,"zw":0,"wx":0.16320948154100234,"wy":-0.09793255003319536,"wz":-0.3331964642354979,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(800.39,405.21,-0.409035);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(724.27,410.55,-0.342008);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(876.51,399.86,-0.476063);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 7', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.6872230194625963,"focal":0.6160287261009216,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.4945254739214768,"xy":-0.3991002835881731,"xz":-0.7721173477791323,"xw":0,"yx":-0.4212876480487136,"yy":0.8870805749985116,"yz":-0.1886972652705832,"yw":0,"zx":0.7602384668721979,"zy":0.23196778362549278,"zz":-0.6068194974539378,"zw":0,"wx":0.2194806394169284,"wy":-0.3338651673035664,"wz":-1.0651536822591703,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(708.34,401.21,-1.10466);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(839.81,130.64,-0.913256);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(576.87,671.78,-1.29606);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 8', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.6872230194625963,"focal":0.6160287261009216,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.4945254739214768,"xy":-0.3991002835881731,"xz":-0.7721173477791323,"xw":0,"yx":-0.4212876480487136,"yy":0.8870805749985116,"yz":-0.1886972652705832,"yw":0,"zx":0.7602384668721979,"zy":0.23196778362549278,"zz":-0.6068194974539378,"zw":0,"wx":0.2194806394169284,"wy":-0.3338651673035664,"wz":-1.0651536822591703,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(708.34,401.21,-1.10466);
    let result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(839.81,130.64,-0.913256);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(576.87,671.78,-1.29606);
    result = camera.project_point_to_pixel(pt, {x: 1400, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('ortho view 9', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.4727619349257109,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5198256707777851,"xy":-0.025748381521807143,"xz":0.8538843134790466,"xw":0,"yx":0.6955711950856535,"yy":0.5930407929274751,"yz":-0.4055654853211439,"yw":0,"zx":-0.4959454612746185,"zy":0.8047606835055555,"zz":0.32618768292987654,"zw":0,"wx":0.01887546077050997,"wy":-0.04344981797624611,"wz":-0.4651040747176285,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(549.50,400.50,-0.449357);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(327.02,80.83,-0.532936);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(771.98,720.18,-0.365778);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 10', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.2167623029000703,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":-0.22698977878421767,"xy":-0.052440822569825976,"xz":-0.9724843353216257,"xw":0,"yx":-0.8211679399256235,"yy":0.5471614112689325,"yz":0.16216526094698552,"yw":0,"zx":0.5236017291388128,"zy":0.8353828278638262,"zz":-0.16726276896121703,"zw":0,"wx":-0.016118386833925375,"wy":-0.018404944247726304,"wz":-0.43965138934207604,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(570.17,533.36,-0.449357);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(940.90,-135.41,-0.338408);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(199.44,1202.14,-0.560306);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 11', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.7950876326948804,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":-0.2962932642059864,"xy":-0.050693619167987335,"xz":0.9537508131238194,"xw":0,"yx":0.8004213849660401,"yy":-0.5580000899024775,"yz":0.21900111634132507,"yw":0,"zx":0.5210909940370931,"zy":0.8282911176560173,"zz":0.20590795441514892,"zw":0,"wx":0.021898758824042044,"wy":-0.02825163656098662,"wz":-0.46331043281121637,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(621.28,413.08,-0.449357);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(477.90,405.85,-0.605139);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(764.67,420.31,-0.293575);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 12', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.472761934925711,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":-0.7931827586458963,"xy":-0.4519195450508546,"xz":-0.40820321214868033,"xw":0,"yx":0.3658339876971906,"yy":-0.8894710834595149,"yz":0.2738736429926108,"yw":0,"zx":-0.4868536955018606,"zy":0.06789724172428052,"zz":0.8708407164631108,"zw":0,"wx":0.10527251063224284,"wy":0.05964952511541821,"wz":-0.4593815853470037,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(738.92,531.40,-0.415621);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(960.95,876.83,-0.477689);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(516.88,185.97,-0.353552);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 13', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.337172680291374,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":-0.5243734105562607,"xy":0.633859631522545,"xz":0.5685548035996457,"xw":0,"yx":0.8434899385620166,"yy":0.4779900350367442,"yz":0.2450515227960467,"yw":0,"zx":-0.1164352431079292,"zy":0.6080687567003094,"zz":-0.7852995445456722,"zw":0,"wx":0.2946020926469726,"wy":0.030695262651250534,"wz":-0.37973834633438336,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(790.15,454.21,-0.415621);
    let result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(770.29,302.88,-0.439419);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(810.00,605.55,-0.391822);
    result = camera.project_point_to_pixel(pt, {x: 1099, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 14', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.337172680291374,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.3819963094701873,"xy":0.43618575499980056,"xz":0.8147520859199202,"xw":0,"yx":0.5778844200187667,"yy":0.575252180138201,"yz":-0.5789081064315877,"yw":0,"zx":-0.7211992322805839,"zy":0.6919732909042791,"zz":-0.032320751561146416,"zw":0,"wx":0.12205907002845401,"wy":0.04709470129736218,"wz":-0.41245190544039334,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(390.23,444.69,-0.415621);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(366.76,352.42,-0.442365);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(413.70,536.96,-0.388876);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 15', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.4727619349257111,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.3819963094701873,"xy":0.43618575499980056,"xz":0.8147520859199202,"xw":0,"yx":0.5778844200187667,"yy":0.575252180138201,"yz":-0.5789081064315877,"yw":0,"zx":-0.7211992322805839,"zy":0.6919732909042791,"zz":-0.032320751561146416,"zw":0,"wx":0.14785298365540492,"wy":-0.037836490139028504,"wz":-0.41245190559139505,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(513.16,402.08,-0.415621);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(446.78,141.10,-0.442365);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(579.54,663.06,-0.388876);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 16', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.4727619349257111,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.08700014638122079,"xy":0.9361675180303642,"xz":0.34061926800470776,"xw":0,"yx":0.08188563975945752,"yy":0.3340384934626923,"yz":-0.9389958465145785,"yw":0,"zx":-0.9928371631455147,"zy":0.1095845883976708,"zz":-0.04759729695726124,"zw":0,"wx":0.02050822133393206,"wy":0.06750665816909697,"wz":-0.4082524455385582,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(303.00,512.93,-0.415621);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(405.06,283.13,-0.344105);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(200.94,742.74,-0.487136);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 17', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.4727619349257111,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.08700014638122079,"xy":0.9361675180303642,"xz":0.34061926800470776,"xw":0,"yx":0.08188563975945752,"yy":0.3340384934626923,"yz":-0.9389958465145785,"yw":0,"zx":-0.9928371631455147,"zy":0.1095845883976708,"zz":-0.04759729695726124,"zw":0,"wx":0.02050822133393206,"wy":0.06750665816909697,"wz":-0.4082524455385582,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(303.00,512.93,-0.415621);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(405.06,283.13,-0.344105);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(200.94,742.74,-0.487136);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 18', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.4727619349257111,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.4086175771283983,"xy":-0.38111508720234927,"xz":0.8293268960756514,"xw":0,"yx":-0.3902327221788,"yy":0.7484546779849679,"yz":0.5362220765711168,"yw":0,"zx":-0.825075762699907,"zy":-0.5427402732933717,"zz":0.15710815456165883,"zw":0,"wx":0.1256019777825687,"wy":-0.07670829786790126,"wz":-0.42883021440826696,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(464.66,255.43,-0.415621);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(568.09,267.65,-0.588593);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(361.24,243.20,-0.242647);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 19', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.4727619349257111,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5450317570708558,"xy":0.8161643776953114,"xz":-0.19187538018657205,"xw":0,"yx":-0.8047745620150314,"yy":0.5734551226260858,"yz":0.15325501368996966,"yw":0,"zx":0.23511317298412376,"zy":0.07088758609090542,"zz":0.9693796611466983,"zw":0,"wx":0.012714170075571702,"wy":0.0242338318603831,"wz":-0.5020862281360596,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(373.56,449.00,-0.453661);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(383.11,205.05,-0.536301);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(364.00,692.96,-0.371021);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 20', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":3.782095479405689,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5450317570708558,"xy":0.8161643776953114,"xz":-0.19187538018657205,"xw":0,"yx":-0.8047745620150314,"yy":0.5734551226260858,"yz":0.15325501368996966,"yw":0,"zx":0.23511317298412376,"zy":0.07088758609090542,"zz":0.9693796611466983,"zw":0,"wx":0.5473473117752247,"wy":-0.10976868066820354,"wz":-0.5020862205514471,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(444.37,382.22,-0.453661);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(445.56,351.73,-0.536301);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(443.18,412.72,-0.371021);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 21', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.3371726802913746,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.6724772936389396,"xy":-0.07572727121015167,"xz":0.7362334874587203,"xw":0,"yx":-0.6304873163342767,"yy":-0.5796118856727449,"yz":0.516271110317432,"yw":0,"zx":0.38763378267973747,"zy":-0.8113664778201054,"zz":-0.4375209489673631,"zw":0,"wx":0.1352154849095025,"wy":1.1181704934214758,"wz":-0.43709882081235907,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(421.66,952.40,-0.453661);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(400.03,1028.70,-0.559617);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(443.30,876.10,-0.347705);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('ortho view 22', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.45539709736129763,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.672477283112888,"xy":-0.0757272861329388,"xz":0.7362334773070471,"xw":0,"yx":-0.6304873158293006,"yy":-0.5796118796303035,"yz":0.5162711241214035,"yw":0,"zx":0.38763380176195295,"zy":-0.8113664807438258,"zz":-0.43752094976140476,"zw":0,"wx":-0.026863418675955285,"wy":0.0712140964345737,"wz":-0.7775170559864991,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(328.51,441.63,-0.794079);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(264.97,665.67,-0.900035);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(392.04,217.59,-0.688123);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 23', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.2707807341668211,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":0.5684988714299651,"xy":-0.80077530086077,"xz":-0.1885948609468823,"xw":0,"yx":-0.6490768695618885,"yy":-0.29573349607133337,"yz":-0.700885840395421,"yw":0,"zx":0.5054781563782433,"zy":0.5208653720310311,"zz":-0.6878889484117017,"zw":0,"wx":-0.03809241381935221,"wy":0.015711107163175444,"wz":-0.755197010936274,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(303.62,495.93,-0.794079);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(206.13,700.96,-0.629616);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(401.12,290.89,-0.958543);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho view 24', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.9932281122116167,"focal":2.471391201019287,"clip_min":-0.37446423810542134,"clip_max":10000};
    camera_data.transform = {"xx":-0.42771032675588955,"xy":0.8844026533313557,"xz":-0.18680449240090846,"xw":0,"yx":-0.702052703180397,"yy":-0.19484734279018429,"yz":0.684950056032005,"yw":0,"zx":0.5693731591289596,"zy":0.42410680109671267,"zz":0.7042355362732494,"zw":0,"wx":0.1457331138101794,"wy":-0.09050109781031043,"wz":-0.7748040060870736,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00251530,0.00625189,0.0494643);
    let expected = new Vector4(460.00,353.11,-0.736157);
    let result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.115061,-0.107975,-0.0410000);
    expected = new Vector4(514.63,270.04,-0.856141);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.120092,0.120479,0.139929);
    expected = new Vector4(405.38,436.18,-0.616173);
    result = camera.project_point_to_pixel(pt, {x: 687, y: 801}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});



test('orhto +z', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":2.0717771732811343,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":1,"yz":0,"yw":0,"zx":0,"zy":0,"zz":1,"zw":0,"wx":0,"wy":-0.3936814069747925,"wz":-0.9265861970751574,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.983903);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(555.28,46.33,-1.05524);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(668.72,509.67,-0.912569);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho -z', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":2.0717771732811343,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":-1,"yz":0,"yw":0,"zx":0,"zy":0,"zz":-1,"zw":0,"wx":0,"wy":0.3936814069747925,"wz":-1.0412204576103976,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.983903);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(555.28,509.67,-0.912569);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(668.72,46.33,-1.05524);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho -y', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.3768893741505508,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":0,"yz":-1,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":0,"wy":0.05731713026762009,"wz":-0.590221920367985,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.983903);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(300.23,46.33,-0.591778);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(923.77,509.67,-1.37603);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho -x', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.9411013722419739,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0,"xy":0,"xz":-1,"xw":0,"yx":-1,"yy":0,"yz":0,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":0.3936814069747925,"wy":0.05731713026762009,"wz":-0.9839033273427775,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.983903);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(1122.00,185.22,-0.887903);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(102.00,370.78,-1.0799);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho y', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.3768893741505508,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-1,"xy":0,"xz":0,"xw":0,"yx":0,"yy":0,"yz":1,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":0,"wy":0.05731713026762009,"wz":-1.37758473431757,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.983904);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(923.77,46.33,-1.37603);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(300.23,509.67,-0.591778);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho x', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.9411013722419739,"focal":0.4091450572013855,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0,"xy":0,"xz":1,"xw":0,"yx":1,"yy":0,"yz":0,"yw":0,"zx":0,"zy":1,"zz":0,"zw":0,"wx":-0.3936814069747925,"wy":0.05731713026762009,"wz":-0.9839033273427775,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(612.00,278.00,-0.983903);
    let result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(102.00,185.22,-1.0799);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(1122.00,370.78,-0.887903);
    result = camera.project_point_to_pixel(pt, {x: 1224, y: 556}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

test('ortho portrait aspect 1', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.2029016811810196,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.9420821566720657,"xy":-0.07205025500875079,"xz":0.3275514781425166,"xw":0,"yx":-0.07455781690521185,"yy":0.9072201332793092,"yz":0.41399608900458307,"yw":0,"zx":-0.32698981944167455,"zy":-0.4144398515176064,"zz":0.8493039900151476,"zw":0,"wx":0.22140814308075996,"wy":-0.12059277646210684,"wz":-0.6371361338635801,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(417.30,533.24,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(397.84,369.22,-0.777201);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(436.76,697.26,-0.268466);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho portrait aspect 2', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":1.2029016811810196,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":0.9111726284897786,"xy":-0.2372441019133665,"xz":0.33686744752245523,"xw":0,"yx":0.13799098502121895,"yy":0.9460861006291322,"yz":0.2930521766725023,"yw":0,"zx":-0.3882305103229434,"zy":-0.22053645119797488,"zz":0.894785306400475,"zw":0,"wx":0.13422149190952554,"wy":-0.12477959855490463,"wz":-0.5869159062569914,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(417.30,533.24,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(358.79,362.43,-0.733914);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(475.81,704.05,-0.311752);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho portrait aspect 3', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":3.4023197434551893,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.12333539839581706,"xy":-0.8456715636007321,"xz":0.5192571482697311,"xw":0,"yx":-0.5467785564315164,"yy":-0.3787511489392148,"yz":-0.7467133167503157,"yw":0,"zx":0.8281434596344389,"zy":-0.37601485835549403,"zz":-0.41568165291211767,"zw":0,"wx":0.8472091257581368,"wy":0.514214588347782,"wz":-0.2526917736011372,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(415.17,469.73,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(445.53,516.33,-0.250224);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(384.80,423.14,-0.795442);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho portrait aspect 4', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.9275639973093902,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.12333539839581706,"xy":-0.8456715636007321,"xz":0.5192571482697311,"xw":0,"yx":-0.5467785564315164,"yy":-0.3787511489392148,"yz":-0.7467133167503157,"yw":0,"zx":0.8281434596344389,"zy":-0.37601485835549403,"zz":-0.41568165291211767,"zw":0,"wx":0.28703351124650367,"wy":0.45080791499438844,"wz":-0.25269177360113854,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(325.20,614.87,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(436.58,785.78,-0.250224);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(213.82,443.96,-0.795442);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});


test('ortho portrait aspect 5', () => {
    const camera = new Camera();
    camera.follow_target_point = false;
    camera.scene_up_direction = Camera.Z_UP;
    const camera_data = {"orthographic":true,"aperture":0.9275639973093902,"focal":0.6160287465071448,"clip_min":-0.8199194456135375,"clip_max":10000};
    camera_data.transform = {"xx":-0.8280646746621275,"xy":0.1576701330917879,"xz":0.5380046689571806,"xw":0,"yx":-0.3114103760659724,"yy":-0.9273364554161281,"yz":-0.20753475916518205,"yw":0,"zx":0.46618930957610244,"zy":-0.3393924390975501,"zz":0.8169946756493979,"zw":0,"wx":0.17362726264861322,"wy":0.6688748400407811,"wz":-0.3943028748900446,"ww":1};
    camera.set_from_object(camera_data);

    let pt = new Vector4(0.00000,0.393681,-0.0573171);
    let expected = new Vector4(325.20,614.87,-0.522833);
    let result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(-0.0960000,0.00155585,-0.128651);
    expected = new Vector4(437.36,863.19,-0.551381);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);

    pt = new Vector4(0.0960000,0.785807,0.0140168);
    expected = new Vector4(213.03,366.55,-0.494285);
    result = camera.project_point_to_pixel(pt, {x: 618, y: 799}, new Vector4());
    expect(new Vector4(result.x.toFixed(2),result.y.toFixed(2),result.z.toPrecision(6))).toBeVector4(expected);
});

