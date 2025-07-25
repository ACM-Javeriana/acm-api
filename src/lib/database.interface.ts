export interface IDatabase {
    insert<T>(
        table: string,
        data: T,
    ): Promise<{ error: string | null; data: any }>;
    insertMany<T>(
        table: string,
        data: T[],
    ): Promise<{ error: string | null; data: any }>;
    getAll(table: string): Promise<{ error: string | null; data: any }>;
    getBy<T>(
        table: string,
        query: Partial<T>,
    ): Promise<{ error: string | null; data: any }>;
    update<T>(
        table: string,
        query: Partial<T>,
        data: T,
    ): Promise<{ error: string | null; data: any }>;
    delete<T>(
        table: string,
        query: Partial<T>,
    ): Promise<{ error: string | null; data: any }>;
}
