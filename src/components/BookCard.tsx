import Image from "next/image";
import { Book } from "@/types/book";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export default function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(book)}
      className="block w-full rounded-xl border-0 bg-transparent p-0 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="overflow-hidden pt-0">
        <div className="relative h-[300px] w-full bg-muted">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <CardContent className="flex flex-col">
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="mb-2 text-muted-foreground">{book.author}</p>
          <Badge className="h-auto w-fit border-transparent bg-green-600/10 px-2.5 py-1 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
            {formatPrice(book.price, book.currency)}
          </Badge>
        </CardContent>
      </Card>
    </button>
  );
}
