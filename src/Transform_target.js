/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Transform } from './Transform';
import { Error as Rs_error, Vector3, Vector4 } from '@migenius/realityserver-client';

/**
 * The Transform_target class adds look at functionality to the {@link RS.Transform}
 * class.
 * @memberof RS
 */
class Transform_target extends Transform {
    /**
     * The default constructor initializes with an identity matrix looking at the point
     * 0, 0, -1.
     * 
     * If location, target_point and up are provided then a look at is
     * performed with those values. Note that the provided up direction will not be set as
     * the nominal up direction.
     * 
     * If an explicit nominal_up is passed this will be used as the nominal up direction.
     * If this is done without look up parameters then the target point will be set
     * to ensure that the up and look direction do not coincide.
     * 
     * If called with only 1 argument then this is used as the nominal up.
     * 
     * @example
     * const z_up_transform = new Transform_target(Transform.Z_AXIS);
     * 
     * @param {RS.Vector3=} location the transform location.
     * @param {RS.Vector3=} target_point the point to look at.
     * @param {RS.Vector3=} up the up direction for the look at.
     * @param {RS.Vector3=} nominal_up the nominal up direction.
     */
    constructor(location, target_point, up, nominal_up) {
        super();

        this.m_follow_target_point = true;

        if (arguments.length === 1) {
            nominal_up = location;
            location = undefined;
        }
        if (nominal_up) {
            this.m_up_direction = new Vector4(nominal_up);
            if (this.m_up_direction.equal_with_tolerance(Transform.Z_AXIS) ||
                    this.m_up_direction.equal_with_tolerance(Transform.NEG_Z_AXIS)) {
                this.m_target_point = new Vector4(0, 1, 0);
            } else {
                this.m_target_point = new Vector4(0, 0, -1);                
            }
        } else {
            // Default to Y up scenes.
            this.m_up_direction = Transform.Y_AXIS.clone();
            this.m_target_point = new Vector4(0, 0, -1);
        }

        if (location && target_point && up) {
            this.look_at(location, target_point, up);
        } else {
            this.look_at(new Vector4(0,0,0), this.m_target_point, this.m_up_direction);
        }
    }

    /*
     * The World to Object space Matrix represented by this Transform_target.
     * Setting this will move the target point to maintain it's distance from
     * the location.
     * @type {RS.Matrix4x4}
     */
    get world_to_obj() {
        return super.world_to_obj;
    }

    set world_to_obj(value) {
        const dist = this.m_translation.distance(this.m_target_point);
        super.world_to_obj = value;
        this.update_target_point(dist);
    }

    /**
     * returns a copy of this Transform_target.
     * @return {RS.Transform_target}
     */
    clone() {
        const transform = new Transform_target();
        this.populate_clone(transform);

        return transform;
    }

    /**
     * Populates the clone with all the required information.
     * Can be used by subclasses so that they can add their own
     * data to the populating process.
     * @access private
     */
    populate_clone(clone) {
        super.populate_clone(clone);

        clone.m_follow_target_point = this.m_follow_target_point;
        clone.m_up_direction.set(this.m_up_direction);
        clone.m_target_point.set(this.m_target_point);
    }

    /**
     * Makes the transform look at the given point from the given location using the optional
     * given up vector. If up is not provided then the nominal up direction is used. If it is
     * provided it does not change the internal nominal up direction.
     * @param {RS.Vector3} location the location.
     * @param {RS.Vector3} target_point the point to look at.
     * @param {RS.Vector3=} up the up direction.
     */
    look_at(location, target_point, up) {
        this.m_translation.set(location);
        this.m_target_point.set(target_point);

        this._look_at_point(target_point, up || this.m_up_direction);
    }

    /**
     * Makes the transform look at the given point using the given up vector.
     * If a location vector is given then the transform is moved to that location first,
     * otherwise the transform's translation will be unaffected.
     * @param {RS.Vector3} point the point to look at.
     * @param {RS.Vector3} up the nominal up direction.
     * @param {RS.Vector3} location the transform location.
     * @access private
     */
    _look_at_point(point, up, location) {
        if (location) {
            this.translation = location;
        }

        this.m_y_axis.set(up);
        this.m_y_axis.normalize();

        const to_point = this.translation.subtract(point).normalize();
        this.m_z_axis.set(to_point);

        this.m_x_axis = this.m_y_axis.cross(this.m_z_axis).normalize();
        this.m_y_axis = this.m_z_axis.cross(this.m_x_axis).normalize();

        this.m_dirty_matrix = true;
    }

    /**
     * Utility function to calculate the rotation angle around the Z axis.
     * @return {Number} the roll angle in radians.
     * @access private
     */
    _calculate_roll_angle() {
        // Get what the right vector would be without roll.
        const no_roll_right = this.m_up_direction.cross(this.m_z_axis).normalize();
        // Get the angle between the current right vector and the right vector without roll.
        let roll_angle = Math.acos(this.m_x_axis.dot(no_roll_right));
        // roll_angle current only has the difference between the two right vectors but needs
        // to know which way it has been rolled.
        roll_angle *= this.m_up_direction.dot(this.m_x_axis) > 0 ? -1 : 1;

        return isNaN(roll_angle) ? 0 : roll_angle;
    }

    /**
     * Rotate the transform to look at the target point.
     * @param {Boolean} reset_y_vector if `true` then the transform will reset to be oriented
     * up. Otherwise the current roll will be preserved.
     * @access private
     */
    look_at_target_point(reset_y_vector) {
        if (!!reset_y_vector) {
            this._look_at_point(this.m_target_point, this.m_up_direction);
        } else {
            // get current roll angle
            const roll_angle = this._calculate_roll_angle();

            this._look_at_point(this.m_target_point, this.m_up_direction);
            // Now that we are looking at the target point the up direction has be reset, now
            // we need to re-apply the roll to the transform.
            if (roll_angle !== 0) {
                this.rotate(0, 0, roll_angle, false);
            }
        }
    }

    /**
     * Moves the target point to be at the end of the z axis, at either the given
     * distance orbased on the target points current distance from the translation vector.
     * @param {Number=} dist the distance to use.
     * @access private
     */
    update_target_point(dist=null) {
        // Distance CAN be less than zero, however that will just mean that the
        // target point ends up behind the translation point compared to where
        // it was before. The distance however CANNOT be zero as the would place
        // the target point at the translation vector which is not allowed.
        if (dist === undefined || dist === null || dist === 0) {
            dist = this.m_translation.distance(this.m_target_point);
        }
        const to_target = this.z_axis.scale(-dist);//z scale negated distance
        this.m_target_point.set(this.m_translation);
        this.m_target_point.add(to_target);
    }

    /**
     * The nominal up direction. When performing look at operations the transform
     * will attempt to keep it's Y axis aligned with this direction. When set the
     * transform will re-orient itself to the new up.
     * @default {x: 0, y: 1, z: 0}
     * @type {RS.Vector4}
     */
    get up_direction() {
        return this.m_up_direction.clone();
    }

    set up_direction(value) {
        // Get the current roll
        let roll_angle = this._calculate_roll_angle();

        // update up vector
        this.m_up_direction.set(value);

        // do a look at to recalculate transform
        let to_target = this.m_follow_target_point ?
            this.m_target_point :
            this.z_axis.add(this.translation);
        this._look_at_point(to_target, this.m_up_direction);

        // reapply the roll
        if (roll_angle !== 0) {
            this.rotate(0, 0, roll_angle, false);
        }
    }

    /**
     * Whether the target point should be followed. If `true` then the transform
     * will be locked to looking at the target point. If not then operations will still
     * occur relative to the target point however the transform diretion will remain the same.
     * @default true
     * @type {Boolean}
     */
    get follow_target_point() {
        return this.m_follow_target_point;
    }

    set follow_target_point(value) {
        this.m_follow_target_point = !!value;
        if (value) {
            this.look_at_target_point();
        }
    }

    /**
     * Sets the target point. Target point CANNOT be the same as the translation vector.
     * @param {RS.Vector3} target_point the target point.
     * @param {Boolean=} reset_y_vector if `true` and we are following the target point then
     * the transform will reset to be oriented up. Otherwise the current roll will be preserved.
     */
    set_target_point(target_point, reset_y_vector=true) {
        if (target_point.equal(this.m_translation)) {
            throw new Rs_error('Target point is equal to translation');
        }

        // If we are setting the target point back to the same location then
        // we don't need to set it and potentially call a look_at_target_point.
        if (target_point.equal_with_tolerance(this.m_target_point)) {
            return;
        }

        this.m_target_point.set(target_point);
        if (this.m_follow_target_point) {
            this.look_at_target_point(reset_y_vector);
        }
    }

    /**
     * The target point
     * @type {RS.Vector3}
     */
    get target_point() {
        return new Vector3(this.m_target_point);
    }

    set target_point(value) {
        this.set_target_point(value);
    }

    /**
     * Translates the target point in either world space or object space.
     * Resulting target point CANNOT be the same as translation vector.
     * @param {Number} dx the amount to translate in X.
     * @param {Number} dy the amount to translate in Y.
     * @param {Number} dz the amount to translate in Z.
     * @param {Boolean=} in_object_space if `true` then translates in object space, otherwise world.
     */
    translate_target_point(dx, dy, dz, in_object_space=true) {
        const old_target_point = this.m_target_point.clone();
        this._translate_vector(dx, dy, dz, this.m_target_point, in_object_space);

        if (this.m_target_point.equal(this.m_translation)) {
            this.m_target_point.set(old_target_point);
            throw new Rs_error('Target point is equal to translation');
        }
        if (this.m_follow_target_point) {
            this.look_at_target_point(false);
        }
        this.m_dirty_matrix = true;
    }

    /**
     * Translates the transform either world space or object space.
     * Resulting target point CANNOT be the same as translation vector.
     * @param {Number} dx the amount to translate in X.
     * @param {Number} dy the amount to translate in Y.
     * @param {Number} dz the amount to translate in Z.
     * @param {Boolean=} in_object_space if `true` then translates in object space, otherwise world.
     * @param {Boolean=} translate_target if `true` then the target point is translated by the same amount.
     * Otherwise the transform will look at the old target point after translation.
     */
    translate(dx, dy, dz, in_object_space=true, translate_target=true) {
        super.translate(dx, dy, dz, in_object_space);

        if (translate_target) {
            this.translate_target_point(dx, dy, dz, in_object_space);
        } else if (this.m_follow_target_point) {
            this.look_at_target_point(false);
        }
    }

    /**
     * Sets the translation in world space.
     * Resulting translation CANNOT be the same as the target point.
     * @param {Number} x the X translation.
     * @param {Number} y the Y translation.
     * @param {Number} z the Z translation.
     * @param {Boolean=} translate_target if `true` then the target point is moved to be
     * at the same relative location as previously.
     * Otherwise the transform will look at the old target point after translation.
     */
    set_translation(x, y, z, translate_target=true) {
        if (!translate_target && this.m_target_point.equal(new Vector4(x, y, z))) {
            throw new Rs_error('Translation is equal to target point');
        }
        const old_translation = this.translation;
        this._set_translation(x, y, z);
        if (translate_target) {
            this.translate_target_point(x - old_translation.x, y - old_translation.y, z - old_translation.z, false);
        } else if (this.m_follow_target_point) {
            this.look_at_target_point(false);
        }
    }

    /**
     * Utility function to rotate each axis around the given axis by the angle.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Array=} rotation_vectors additional array of RS.Vector4 to rotate.
     * @param {Boolean=} in_object_space if `true` then the axis is in object space, otherwise world.
     * @access private
     */
    _rotate_y_vectors(axis, angle, rotation_vectors, in_object_space=false) {
        let vectors = [ this.m_x_axis, this.m_y_axis, this.m_z_axis ];
        if (rotation_vectors != null) {
            vectors = vectors.concat(rotation_vectors);
        }

        this._rotate_vectors(axis, angle, vectors, in_object_space);
    }

    /**
     * Performs an Euler rotation on the transform in ZYX order. If rotate_target_point is set
     * to `true` (or if follow_target_point is `false`) then the target point
     * will be rotated around the translation vector.
     *
     * If `rotate_target_point` is `false`, and we are following the target point then this will only
     * apply the `dz` rotation as we must keep looking at the target point.
     * @param {Number} dx X rotation in radians.
     * @param {Number} dy Y rotation in radians.
     * @param {Number} dz Z rotation in radians.
     * @param {Boolean=} rotate_target_point if `true` then the target point is rotated by the same amount.
     */
    rotate(dx, dy, dz, rotate_target_point=true) {
        this._rotate_z_vectors(this.m_z_axis, -dz);

        if (rotate_target_point || !this.m_follow_target_point) {
            this._rotate_y_vectors(this.m_up_direction, dy);
            this._rotate_x_vectors(this.m_x_axis, dx);
        }

        if (rotate_target_point) {
            this.update_target_point();
        }

        this.m_dirty_matrix = true;
    }

    /**
     * This sets the rotation of the transform. If rotate_target_point is `true`` then the target point
     * will be rotated around the translation vector.
     *
     * If `rotate_target_point` is `false`, and we are following the target point then this will only
     * apply the `z` rotation as we must keep looking at the target point.
     * @param {Number} x X rotation in radians.
     * @param {Number} y Y rotation in radians.
     * @param {Number} z Z rotation in radians.
     * @param {Boolean=} rotate_target_point if `true` then the target point is rotated by the same amount.
     * Otherwise we keep looking at the current target point
     */
    set_rotation(x, y, z, rotate_target_point=true) {
        if (rotate_target_point || !this.m_follow_target_point) {
            this.m_x_axis.set(Transform.X_AXIS);
            this.m_y_axis.set(Transform.Y_AXIS);
        }
        this.m_z_axis.set(Transform.Z_AXIS);

        this.rotate(x, y, z, rotate_target_point);
    }

    /**
     * Rotates the transform about the given axis by the given angle in radians. If `in_object_space` is `true`,
     * then the axis will be transform into object space first. If `rotate_target_point` is  true then the target
     * point is also rotated.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Boolean=} in_object_space if `true` then the axis is in object space, otherwise world.
     * @param {Boolean=} rotate_target_point if `true` then the target point is rotated by the same amount. Otherwise
     * we keep looking at the current target point.
     */
    rotate_around_axis(axis, angle, in_object_space=true, rotate_target_point=true) {
        super.rotate_around_axis(axis, angle, in_object_space);

        if (rotate_target_point) {
            this.update_target_point();
        } else if (this.m_follow_target_point) {
            this.look_at_target_point(false);
        }
        this.m_dirty_matrix = true;
    }

    /**
     * Sets the rotation of the transform about the given axis by the given angle in radians. If `rotate_target_point`
     * is set to true then the target point is also rotated.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Boolean=} rotate_target_point if `true` then the target point is rotated by the same amount. Otherwise
     * we keep looking at the current target point.
     */
    set_rotation_around_axis(axis, angle, rotate_target_point=true) {
        this.m_x_axis.set(Transform.X_AXIS);
        this.m_y_axis.set(Transform.Y_AXIS);
        this.m_z_axis.set(Transform.Z_AXIS);

        this.rotate_around_axis(axis, angle, false, rotate_target_point);
    }

    /**
     * Performs a ZYX Euter rotation around a given world space point. If `rotate_target_point`` is true
     * and the target point is not at the same location as the given point, then the target point is also rotated
     * around the point.
     * @param {RS.Vector3} point the point to rotate around.
     * @param {Number} dx the X rotation in radians.
     * @param {Number} dy the Y rotation in radians.
     * @param {Number} dz the Z rotation in radians.
     * @param {Boolean=true} rotate_target_point if `true` then the target point is rotated by the same amount. Otherwise
     * we keep looking at the current target point.
     * @param {Boolean=true} maintain_up if `true` then dy rotates around the nominal up direction so the rotation remains
     * 'vertical'. If `false` then rotates around the transforms current Y axis.
     */
    rotate_around_point(point, dx, dy, dz, rotate_target_point=true, maintain_up=true) {
        if (rotate_target_point && point.equal_with_tolerance(this.m_target_point)) {
            rotate_target_point = false;
        }

        const to_point = this.translation.subtract(point);
        let to_target_point;
        let rotate;

        if (rotate_target_point) {
            to_target_point = this.target_point.subtract(point);
            rotate = [ to_point, to_target_point ];
        } else {
            rotate = [ to_point ];
        }

        this._rotate_z_vectors(this.m_z_axis, -dz);
        if (maintain_up) {
            this._rotate_y_vectors(this.m_up_direction, dy, rotate);
        } else {
            this._rotate_y_vectors(this.m_y_axis, dy, rotate);
        }
        this._rotate_x_vectors(this.m_x_axis, dx, rotate);

        this.m_translation.set(point);
        this.m_translation.add(to_point);

        if (rotate_target_point) {
            this.m_target_point.set(point);
            this.m_target_point.add(to_target_point);
        } else if (this.m_follow_target_point) {
            this.look_at_target_point(false);
        }

        this.m_dirty_matrix = true;
    }

    /**
     * Orbits around the target point by the given amount.
     * @param {Number} dx the X rotation in radians.
     * @param {Number} dy the Y rotation in radians.
     * @param {Number} dz the Z rotation in radians.
     * @param {Boolean=} maintain_up if `true` then dy rotates around the nominal up direction so the rotation remains
     * 'vertical'. If `false` then rotates around the transforms current Y axis.
     */
    orbit_around_target_point(dx, dy, dz, maintain_up=true) {
        this.rotate_around_point(this.m_target_point, dx, dy, dz, false, maintain_up);
    }
}

export { Transform_target };
