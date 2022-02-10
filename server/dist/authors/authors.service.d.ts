import { AuthorsEntity } from 'src/entities/authors.entity';
import { Repository } from 'typeorm';
export declare class AuthorsService {
    private readonly authorsRepository;
    constructor(authorsRepository: Repository<AuthorsEntity>);
    getAuthors(): Promise<AuthorsEntity[]>;
    postAuthor(dto: any): Promise<boolean>;
    checkDuplicatedAuthor(author: string): Promise<void>;
}
