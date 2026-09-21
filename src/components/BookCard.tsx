import Image from "next/image";
import { Book } from "@/types/book";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="gap-0 overflow-hidden pt-0">
      <div className="relative h-[300px] w-full bg-muted">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <CardContent className="flex flex-col pt-4 pb-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="mb-2 text-muted-foreground">{book.author}</p>
        <Badge className="h-auto border-transparent bg-green-600/10 px-2.5 py-1 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
          {formatPrice(book.price, book.currency)}
        </Badge>
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
