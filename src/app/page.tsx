"use client";

import { useState } from "react";
import data from "../../public/data.json";
import BookCard from "@/components/BookCard";
import Modal from "@/components/Modal";
import BookForm from "@/components/BookForm";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { Library, Plus } from "lucide-react";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1,
    };
    setBooks([...books, book]);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setBooks(
      books.map((book) =>
        book.id === selectedBook?.id ? { ...book, ...updatedBook } : book
      )
    );
    setIsModalOpen(false);
    setSelectedBook(undefined);
  };

  const handleDeleteBook = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <Library className="size-7 text-primary" />
            Book Gallery
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {books.length} {books.length === 1 ? "book" : "books"} in the
            collection
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => {
            setSelectedBook(undefined);
            setIsModalOpen(true);
          }}
        >
          <Plus data-icon="inline-start" className="size-4" />
          Add New Book
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(undefined);
        }}
        title={selectedBook ? "Edit Book" : "Add New Book"}
      >
        <BookForm
          book={selectedBook}
          onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedBook(undefined);
          }}
        />
      </Modal>
    </main>
  );
}
