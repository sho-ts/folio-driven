import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { CompanyId } from '@/domain/object/company/company-id.object';

@Entity({ synchronize: false })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  companyId: CompanyId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
