import { postgresPool } from "../../database/postgres.connection";
import { BookRepository } from "./book.repository";
import { Book } from "./book.model";
import { CreateBookDTO, UpdateBookDTO } from "./book.dto";

export class BookRepositoryPostgres implements BookRepository {
  async findById(id: number): Promise<Book | null> {
    const result = await postgresPool.query(
      "SELECT id, title, is_rented FROM books WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) return null;

    return {
      id: result.rows[0].id,
      title: result.rows[0].title,
      isRented: result.rows[0].is_rented,
    };
  }

  async markAsRented(id: number): Promise<void> {
    await postgresPool.query(
      "UPDATE books SET is_rented = true WHERE id = $1",
      [id]
    );
  }

  async create(data: CreateBookDTO): Promise<Book> {
    const result = await postgresPool.query(
      "INSERT INTO books (title, author, published_at, is_rented) VALUES ($1, $2, $3, $4) RETURNING id, title, author, published_at, is_rented",
      [
        data.title,
        data.author,
        data.publishedAt || null,
        data.isRented || false
      ]
    );

    return {
      id: result.rows[0].id,
      title: result.rows[0].title,
      author: result.rows[0].author,
      publishedAt: result.rows[0].published_at,
      isRented: result.rows[0].is_rented,
    };
  }

  async update(data: UpdateBookDTO): Promise<void> {
    const updates: string[] = [];
    const values: (string | number)[] = [];
    let paramCount = 1;

    if (data.title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(data.title);
    }

    if (data.author !== undefined) {
      updates.push(`author = $${paramCount++}`);
      values.push(data.author);
    }

    if (updates.length === 0) return;

    values.push(data.id!);
    const query = `UPDATE books SET ${updates.join(", ")} WHERE id = $${paramCount}`;

    await postgresPool.query(query, values);
  }

  async delete(id: number): Promise<void> {
    await postgresPool.query("DELETE FROM books WHERE id = $1", [id]);
  }

  // MOCK IMPLEMENTATIONS FOR OTHER METHODS

  private books: Book[] = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      isRented: false
    }
  ];

  async findAll(): Promise<Book[]> {
    return this.books;
  }

}
