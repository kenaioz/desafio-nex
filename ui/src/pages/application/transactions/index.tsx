import { Button } from "@/components/ui/button";

export default function Transactions() {
  return (
    <div className="flex h-full">
      <Button
        className="cursor-pointer transition-all duration-300 ease-in-out"
        onClick={() => console.log("Teste")}
      >
        Click me
      </Button>
    </div>
  );
}
