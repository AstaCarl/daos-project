type Title = {
  title: string;
};

export function Title({ title }: Title) {
  return <h1 className="font-display text-blue text-3xl">{title}</h1>;
}
