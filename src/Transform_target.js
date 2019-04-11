/******************************************************************************
 * Copyright 2010-2019 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Transform } from './Transform';
import { Error as Rs_error, Vector3, Vector4 } from 'realityserver-client';

/**
 * @file Transform_target.js
 * Defines the Transform_target class.
 */


/**
 * @class Transform_target.
 */

/**
 * @ctor
 * Creates a %Transform_target.
 */
export class Transform_target extends Transform {
    constructor() {
        super();

        this.m_follow_target_point = true;

        // Default to Y up scenes.
        this.m_up_direction = Transform.Y_AXIS.clone();

        // So the target point is not the same as the translation.
        this.m_target_point = new Vector4(0, 0, -1);
        // this.m_z_axis.z = -1; //z scale out
    }

    get world_to_obj() {
        //this.m_z_axis.scale(-1);//z scale out
        //this.m_dirty_matrix = true;//z scale out
        //const result = super.world_to_obj;
        //this.m_z_axis.scale(-1);//z scale out
        //console.log(this.translation);
        //console.log(this.m_translation);
        return super.world_to_obj;
    }

    set world_to_obj(value) {
        const dist = this.m_translation.distance(this.m_target_point);
        super.world_to_obj = value;
        this.update_target_point(dist);
    }

    clone() {
        const transform = new Transform_target();
        this.populate_clone(transform);

        return transform;
    }

    populate_clone(clone) {
        super.populate_clone(clone);

        clone.m_follow_target_point = this.m_follow_target_point;
        clone.m_up_direction.set(this.m_up_direction);
        clone.m_target_point.set(this.m_target_point);
    }

    /**
     * Makes the transform look at the given point using the given up vector.
     * If a location vector is given then the transform is moved to that location first,
     * otherwise the transform's translation will be unaffected.
     */
    _look_at_point(point, up, location) {
        if (location) {
            this.translation = location;
        }

        this.m_y_axis.set(up);
        this.m_y_axis.normalize();

        // const to_point = point.clone().subtract(this.m_translation).normalize(); //z scale out
        const to_point = this.translation.subtract(point).normalize();//z scale in
        this.m_z_axis.set(to_point);

        this.m_x_axis = this.m_y_axis.cross(this.m_z_axis).normalize();
        this.m_y_axis = this.m_z_axis.cross(this.m_x_axis).normalize();

        //this.m_x_axis.scale(-1);//z scale out

        this.m_dirty_matrix = true;
    }

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
     * Short hand to look at the target point.
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
     * Moves the target point to be at the end of the z axis, at a distance
     * that is either given in 'dist' or is based on the target points
     * previous distance from the translation vector.
     */
    update_target_point(dist) {
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
     * Sets the up direction vector.
     */
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

    get up_direction() {
        return this.m_up_direction.clone();
    }

    /**
     * Sets if the target point will followed.
     */
    set follow_target_point(value) {
        this.m_follow_target_point = !!value;
        if (value) {
            this.look_at_target_point();
        }
    }
    get follow_target_point() {
        return this.m_follow_target_point;
    }

    /**
     * Sets the target point. Target point CANNOT be ontop of the translation vector.
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

    set target_point(value) {
        this.set_target_point(value);
    }

    get target_point() {
        return new Vector3(this.m_target_point);
    }

    /**
     * Translates the target point by {dx, dy, dz} in either world space or object space.
     * Resulting target point CANNOT be ontop of translation vector.
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
     * Translates the transform by {dx, dy, dz} in either world space or object space.
     * Can also translate the target point by the same values.
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
     * Sets the translation to {x, y, z} in world space. If translate_target is set then
     * the target point will retain it's relative position from the translation vector.
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

    _rotate_y_vectors(axis, angle, rotation_vectors, in_object_space=false) {
        let vectors = [ this.m_x_axis, this.m_y_axis, this.m_z_axis ];
        if (rotation_vectors != null) {
            vectors = vectors.concat(rotation_vectors);
        }

        this._rotate_vectors(axis, angle, vectors, in_object_space);
    }

    /**
     * Rotates the transform by {dx, dy, dz}. If rotate_target_point is set to true then the target point
     * will be rotated around the translation vector.
     *
     * If it is set to false and we are following the target point then transform is only rotated by {0, 0, dz}
     * to keep the transform always looking at the target point.
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
     * This sets the rotation of the transform. If rotate_target_point is set to true then the target point
     * will be rotated around the translation vector.
     *
     * If it is set to false and we are following the target point then transform is only rotated by {0, 0, z}
     * to keep the transform always looking at the target point.
     */
    set_rotation(x, y, z, rotate_target_point=true) {
        if (rotate_target_point || !this.m_follow_target_point) {
            this.m_x_axis.set(Transform.X_AXIS);
            this.m_y_axis.set(Transform.Y_AXIS);
        }
        //this.m_z_axis.set(Transform.NEG_Z_AXIS);//z scale out
        this.m_z_axis.set(Transform.Z_AXIS);//z scale in

        this.rotate(x, y, z, rotate_target_point);
    }

    /**
     * Rotates the transform about the given axis by the given angle in radians. If in_object_space is set to true,
     * then the axis will be transform into object space first. If rotate_target_point is set to true then the target
     * point is also rotated.
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
     * Sets the rotation of the transform about the given axis by the given angle in radians. If in_object_space is set
     * to true, then the axis will be transform into object space first. If rotate_target_point is set to true then the
     * target point is also rotated.
     */
    set_rotation_around_axis(axis, angle, rotate_target_point=true) {
        this.m_x_axis.set(Transform.X_AXIS);
        this.m_y_axis.set(Transform.Y_AXIS);
        //this.m_z_axis.set(Transform.NEG_Z_AXIS);//z scale out
        this.m_z_axis.set(Transform.Z_AXIS);//z scale in

        this.rotate_around_axis(axis, angle, false, rotate_target_point);
    }

    /**
     * Rotates the transform around a given world space point by {dx, dy, dz}. If rotate_target_point is set to true
     * and the target point is not at the same location as the given point, then the target point is also rotated
     * around the point.
     */
    rotate_around_point(point, dx, dy, dz, rotate_target_point=true) {
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
        this._rotate_y_vectors(this.m_up_direction, dy, rotate);
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
     * Short hand for rotating around the target point by {dx, dy, dz}.
     */
    orbit_around_target_point(dx, dy, dz) {
        this.rotate_around_point(this.m_target_point, dx, dy, dz, false);
    }
}