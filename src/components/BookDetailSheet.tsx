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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [formData, setFormData] = useState<Partial<Book>>({});

  useEffect(() => {
    if (book) {
      setDisplayBook(book);
      setMode("view");
    }
  }, [book]);

  const startEditing = () => {
    if (!displayBook) return;
    setFormData(displayBook);
    setMode("edit");
  };

  const saveEdits = () => {
    onUpdate(formData);
  };

  const editing = mode === "edit";

  return (
    <Sheet open={!!book} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader className="border-b">
          {editing ? (
            <div className="space-y-2">
              <div className="space-y-1.5">
                <Label htmlFor="detail-title">Title</Label>
                <Input
                  id="detail-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="pr-10 font-heading text-base font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="detail-author">Author</Label>
                <Input
                  id="detail-author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <SheetTitle>{displayBook?.title}</SheetTitle>
              <SheetDescription>{displayBook?.author}</SheetDescription>
            </>
          )}
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {displayBook && (
            <>
              <div className="relative h-64 w-full bg-muted">
                <Image
                  src={
                    (editing ? formData.coverImage : displayBook.coverImage) ||
                    displayBook.coverImage
                  }
                  alt={`Cover of ${displayBook.title}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              {editing && (
                <div className="space-y-1.5">
                  <Label htmlFor="detail-cover">Cover Image URL</Label>
                  <Input
                    id="detail-cover"
                    value={formData.coverImage}
                    onChange={(e) =>
                      setFormData({ ...formData, coverImage: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              {editing ? (
                <div className="flex gap-2">
                  <div className="w-24 space-y-1.5">
                    <Label htmlFor="detail-price">Price</Label>
                    <Input
                      id="detail-price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="w-20 space-y-1.5">
                    <Label htmlFor="detail-currency">Currency</Label>
                    <Input
                      id="detail-currency"
                      value={formData.currency}
                      onChange={(e) =>
                        setFormData({ ...formData, currency: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              ) : (
                <Badge className="h-auto w-fit border-transparent bg-green-600/10 px-2.5 py-1 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  {formatPrice(displayBook.price, displayBook.currency)}
                </Badge>
              )}

              {displayBook.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {displayBook.genres.map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              {editing ? (
                <div className="space-y-1.5">
                  <Label htmlFor="detail-description">Description</Label>
                  <Textarea
                    id="detail-description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    required
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {displayBook.description}
                </p>
              )}

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
                  {editing ? (
                    <dd>
                      <Input
                        aria-label="ISBN"
                        value={formData.isbn}
                        onChange={(e) =>
                          setFormData({ ...formData, isbn: e.target.value })
                        }
                        className="h-7"
                        required
                      />
                    </dd>
                  ) : (
                    <dd className="font-medium">{displayBook.isbn}</dd>
                  )}
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

        <SheetFooter className="flex-row justify-end border-t">
          {editing ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMode("view")}
              >
                Cancel
              </Button>
              <Button type="button" onClick={saveEdits}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="destructive"
                onClick={() => displayBook && onDelete(displayBook.id)}
              >
                Delete
              </Button>
              <Button type="button" onClick={startEditing}>
                Edit
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
