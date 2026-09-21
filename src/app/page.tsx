"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import data from "../../public/data.json";
import BookCard from "@/components/BookCard";
import Modal from "@/components/Modal";
import BookForm from "@/components/BookForm";
import BookDetailSheet from "@/components/BookDetailSheet";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Book } from "@/types/book";
import { Library, Plus } from "lucide-react";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [detailBook, setDetailBook] = useState<Book | undefined>(undefined);
  const [bookPendingDelete, setBookPendingDelete] = useState<
    Book | undefined
  >(undefined);
  // Freeze the last non-undefined book so the AlertDialog's title doesn't
  // blank out during its closing animation.
  const [displayPendingDelete, setDisplayPendingDelete] = useState<
    Book | undefined
  >(undefined);
  useEffect(() => {
    if (bookPendingDelete) setDisplayPendingDelete(bookPendingDelete);
  }, [bookPendingDelete]);

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
    const book = books.find((b) => b.id === id);
    if (book) setBookPendingDelete(book);
  };

  const confirmDelete = () => {
    if (!bookPendingDelete) return;
    setBooks(books.filter((book) => book.id !== bookPendingDelete.id));
    setDetailBook(undefined);
    setBookPendingDelete(undefined);
    toast.success(`"${bookPendingDelete.title}" deleted`);
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

      <AlertDialog
        open={!!bookPendingDelete}
        onOpenChange={(open) => !open && setBookPendingDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{displayPendingDelete?.title}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This removes the book from your collection. This can&apos;t be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
