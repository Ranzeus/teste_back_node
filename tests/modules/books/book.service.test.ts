import { BookService } from '../../../src/modules/books/book.service';
import { BookRepository } from '../../../src/modules/books/book.repository';
import { Book } from '../../../src/modules/books/book.model';
import { CreateBookDTO, UpdateBookDTO } from '../../../src/modules/books/book.dto';

describe('BookService - rentBook', () => {
  let bookService: BookService;
  let mockRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    // Create repository mock
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      markAsRented: jest.fn(),
    };

    bookService = new BookService(mockRepository);
  });

  describe('rentBook - Success Cases', () => {
    it('should rent a book successfully', async () => {
      const bookId = 1;
      const mockBook: Book = {
        id: bookId,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isRented: false,
      };

      mockRepository.findById.mockResolvedValue(mockBook);
      mockRepository.markAsRented.mockResolvedValue(undefined);

      const result = await bookService.rentBook(bookId);

      expect(result).toEqual({ bookId, rented: true });
      expect(mockRepository.findById).toHaveBeenCalledWith(bookId);
      expect(mockRepository.markAsRented).toHaveBeenCalledWith(bookId);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.markAsRented).toHaveBeenCalledTimes(1);
    });
  });

  describe('rentBook - Error Cases', () => {
    it('should throw error if book does not exist', async () => {
      const bookId = 999;

      mockRepository.findById.mockResolvedValue(null);

      await expect(bookService.rentBook(bookId)).rejects.toThrow(
        'Book not found'
      );

      expect(mockRepository.findById).toHaveBeenCalledWith(bookId);
      expect(mockRepository.markAsRented).not.toHaveBeenCalled();
    });

    it('should throw error if book is already rented', async () => {
      const bookId = 1;
      const mockBook: Book = {
        id: bookId,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isRented: true,
      };

      mockRepository.findById.mockResolvedValue(mockBook);

      await expect(bookService.rentBook(bookId)).rejects.toThrow(
        'Book already rented'
      );

      expect(mockRepository.findById).toHaveBeenCalledWith(bookId);
      expect(mockRepository.markAsRented).not.toHaveBeenCalled();
    });
  });
});

describe('BookService - createBook', () => {
  let bookService: BookService;
  let mockRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    // Create repository mock
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      markAsRented: jest.fn(),
    };

    bookService = new BookService(mockRepository);
  });

  describe('createBook - Success Cases', () => {
    it('should create a book successfully', async () => {
      const createBookDTO: CreateBookDTO = {
        title: 'Design Patterns',
        author: 'Gang of Four',
      };

      const mockBook: Book = {
        id: 1,
        ...createBookDTO,
        isRented: false,
      };

      mockRepository.create.mockResolvedValue(mockBook);

      const result = await bookService.createBook(createBookDTO);

      expect(result).toEqual({
        title: 'Design Patterns',
        msg: 'Sucessfully created book',
      });
      expect(mockRepository.create).toHaveBeenCalledWith(createBookDTO);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('createBook - Error Cases', () => {
    it('should throw error if title is missing', async () => {
      const createBookDTO: Partial<CreateBookDTO> = {
        author: 'Gang of Four',
      };

      await expect(
        bookService.createBook(createBookDTO as CreateBookDTO)
      ).rejects.toThrow('Problens to Register Book: title and author are required');

      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error if author is missing', async () => {
      const createBookDTO: Partial<CreateBookDTO> = {
        title: 'Design Patterns',
      };

      await expect(
        bookService.createBook(createBookDTO as CreateBookDTO)
      ).rejects.toThrow('Problens to Register Book: title and author are required');

      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw error if repository fails to create book', async () => {
      const createBookDTO: CreateBookDTO = {
        title: 'Design Patterns',
        author: 'Gang of Four',
      };

      mockRepository.create.mockRejectedValue(
        new Error('Database connection error')
      );

      await expect(bookService.createBook(createBookDTO)).rejects.toThrow(
        'Problens to Register Book: Database connection error'
      );

      expect(mockRepository.create).toHaveBeenCalledWith(createBookDTO);
    });
  });
});

describe('BookService - deleteBook', () => {
  let bookService: BookService;
  let mockRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    // Create repository mock
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      markAsRented: jest.fn(),
    };

    bookService = new BookService(mockRepository);
  });

  describe('deleteBook - Success Cases', () => {
    it('should delete a book successfully', async () => {
      const bookId = 1;
      const mockBook: Book = {
        id: bookId,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isRented: false,
      };

      mockRepository.findById.mockResolvedValue(mockBook);
      mockRepository.delete.mockResolvedValue(undefined);

      const result = await bookService.deleteBook(bookId);

      expect(result).toEqual({ bookId, rented: true });
      expect(mockRepository.findById).toHaveBeenCalledWith(bookId);
      expect(mockRepository.delete).toHaveBeenCalledWith(bookId);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteBook - Error Cases', () => {
    it('should throw error if book does not exist', async () => {
      const bookId = 999;

      mockRepository.findById.mockResolvedValue(null);

      await expect(bookService.deleteBook(bookId)).rejects.toThrow(
        'Book not found'
      );

      expect(mockRepository.findById).toHaveBeenCalledWith(bookId);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw error if book is rented', async () => {
      const bookId = 1;
      const mockBook: Book = {
        id: bookId,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isRented: true,
      };

      mockRepository.findById.mockResolvedValue(mockBook);

      await expect(bookService.deleteBook(bookId)).rejects.toThrow(
        'Book already rented'
      );

      expect(mockRepository.findById).toHaveBeenCalledWith(bookId);
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});

describe('BookService - updateBook', () => {
  let bookService: BookService;
  let mockRepository: jest.Mocked<BookRepository>;

  beforeEach(() => {
    // Create repository mock
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      markAsRented: jest.fn(),
    };

    bookService = new BookService(mockRepository);
  });

  describe('updateBook - Success Cases', () => {
    it('should update a book successfully', async () => {
      const updateBookDTO: UpdateBookDTO = {
        id: 1,
        title: 'Clean Code - Updated',
        author: 'Robert C. Martin',
      };

      mockRepository.update.mockResolvedValue(undefined);

      const result = await bookService.updateBook(updateBookDTO);

      expect(result).toEqual({ msg: 'Book updated successfully' });
      expect(mockRepository.update).toHaveBeenCalledWith(updateBookDTO);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateBook - Error Cases', () => {
    it('should throw error if title is missing', async () => {
      const updateBookDTO: Partial<UpdateBookDTO> = {
        id: 1,
        author: 'Robert C. Martin',
      };

      await expect(
        bookService.updateBook(updateBookDTO as UpdateBookDTO)
      ).rejects.toThrow('Problens to Register Book: title and author are required');

      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error if author is missing', async () => {
      const updateBookDTO: Partial<UpdateBookDTO> = {
        id: 1,
        title: 'Clean Code - Updated',
      };

      await expect(
        bookService.updateBook(updateBookDTO as UpdateBookDTO)
      ).rejects.toThrow('Problens to Register Book: title and author are required');

      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error if repository fails to update book', async () => {
      const updateBookDTO: UpdateBookDTO = {
        id: 1,
        title: 'Clean Code - Updated',
        author: 'Robert C. Martin',
      };

      mockRepository.update.mockRejectedValue(
        new Error('Database connection error')
      );

      await expect(bookService.updateBook(updateBookDTO)).rejects.toThrow(
        'Problens to Register Book: Database connection error'
      );

      expect(mockRepository.update).toHaveBeenCalledWith(updateBookDTO);
    });
  });
});
