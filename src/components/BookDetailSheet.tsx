"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Book } from "@/types/book";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookForm from "@/components/BookForm";
import { formatPrice, formatDate } from "@/lib/format";

interface BookDetailSheetProps {
  book: Book | undefined;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updatedBook: Partial<Book>) => void;
  onDelete: (id: number) => void;
}

export default function BookDetailSheet({
  book,
  onOpenChange,
  onUpdate,
  onDelete,
}: BookDetailSheetProps) {
  // Keep showing the last book while the sheet is animating closed, instead
  // of blanking the content the instant `book` clears to undefined. Also
  // reset back to view mode whenever a (new, or freshly-saved) book comes in.
  const [displayBook, setDisplayBook] = useState(book);
  const [mode, setMode] = useState<"view" | "edit">("view");
  useEffect(() => {
    if (book) {
      setDisplayBook(book);
      setMode("view");
    }
  }, [book]);

  return (
    <Sheet open={!!book} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>{mode === "edit" ? "Edit Book" : displayBook?.title}</SheetTitle>
          {mode === "view" && (
            <SheetDescription>{displayBook?.author}</SheetDescription>
          )}
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {displayBook && mode === "edit" && (
            <BookForm
              book={displayBook}
              onSubmit={onUpdate}
              onCancel={() => setMode("view")}
            />
          )}

          {displayBook && mode === "view" && (
            <>
              <div className="relative h-64 w-full bg-muted">
                <Image
                  src={displayBook.coverImage}
                  alt={`Cover of ${displayBook.title}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              <Badge className="h-auto border-transparent bg-green-600/10 px-2.5 py-1 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                {formatPrice(displayBook.price, displayBook.currency)}
              </Badge>

              {displayBook.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {displayBook.genres.map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                {displayBook.description}
              </p>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Publisher</dt>
                  <dd className="font-medium">{displayBook.publisher}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Published</dt>
                  <dd className="font-medium">
                    {formatDate(displayBook.publicationDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">ISBN</dt>
                  <dd className="font-medium">{displayBook.isbn}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Pages</dt>
                  <dd className="font-medium">{displayBook.pages}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Stock</dt>
                  <dd className="font-medium">
                    {displayBook.stock > 0
                      ? `${displayBook.stock} available`
                      : "Out of stock"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Rating</dt>
                  <dd className="font-medium">{displayBook.rating} / 5</dd>
                </div>
              </dl>
            </>
          )}
        </div>

        {mode === "view" && (
          <SheetFooter className="flex-row justify-end border-t">
            <Button
              variant="destructive"
              onClick={() => displayBook && onDelete(displayBook.id)}
            >
              Delete
            </Button>
            <Button onClick={() => setMode("edit")}>Edit</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
