import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import Immobile from './Properties';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Immobile, immobile => immobile.image)
    @JoinColumn({ name: 'immobile_id'})
    immobile: Immobile;
}