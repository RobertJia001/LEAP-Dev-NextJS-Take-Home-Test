"use client";

import { useState } from "react";
import data from "../../public/data.json";
import BookCard from "@/components/BookCard";
import Modal from "@/components/Modal";
import BookForm from "@/components/BookForm";
import BookDetailSheet from "@/components/BookDetailSheet";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { Library, Plus } from "lucide-react";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailBook, setDetailBook] = useState<Book | undefined>(undefined);

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1,
    };
    setBooks([...books, book]);
    setIsAddModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    if (!detailBook) return;
    const merged = { ...detailBook, ...updatedBook };
    setBooks(books.map((book) => (book.id === detailBook.id ? merged : book)));
    setDetailBook(merged);
  };

  const handleDeleteBook = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
      setDetailBook(undefined);
    }
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="lg" onClick={() => setIsAddModalOpen(true)}>
            <Plus data-icon="inline-start" className="size-4" />
            Add New Book
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onSelect={setDetailBook} />
        ))}
      </div>

      <BookDetailSheet
        book={detailBook}
        onOpenChange={(open) => !open && setDetailBook(undefined)}
        onUpdate={handleUpdateBook}
        onDelete={handleDeleteBook}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Book"
      >
        <BookForm
          onSubmit={handleAddBook}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </main>
  );
}
