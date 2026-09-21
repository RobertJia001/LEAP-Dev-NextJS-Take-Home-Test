import Image from "next/image";
import { Book } from "@/types/book";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="gap-0 overflow-hidden pt-0">
      <div className="relative h-[300px] w-full">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardContent className="flex flex-col pt-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-muted-foreground">{book.author}</p>
        <p className="mb-2 font-semibold text-primary">
          {book.currency} {book.price.toFixed(2)}
        </p>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="gap-2 border-t-0 bg-transparent pt-0">
        <Button onClick={() => onEdit(book)}>Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(book.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
