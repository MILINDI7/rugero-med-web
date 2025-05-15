const newsItems = [
    {
      title: "New Partnership with MedTech Africa",
      date: "March 2025",
      summary: "We are proud to announce a new partnership to expand our product range."
    },
    {
      title: "RugeroMed Opens New Office",
      date: "February 2025",
      summary: "We opened our new office in Kigali to serve our clients better."
    },
  ];
  
  const News = () => (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest News</h2>
      <div className="space-y-6">
        {newsItems.map((item, i) => (
          <div key={i} className="border-b pb-4">
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.date}</p>
            <p>{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default News;
  