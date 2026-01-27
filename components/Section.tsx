type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
