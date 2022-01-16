import React, { CSSProperties } from 'react';


const colorMap = ["url(/images/covers/red.png)", "url(/images/covers/yellow.png)", "url(/images/covers/green.png)", "url(/images/covers/gray.png)"]

export function BookDetailModal({ book, setSelectedBook }: any) {
  let style: CSSProperties = {
    zIndex: 9999,
    width: "30vw",
    height: "30vh",
    position: "absolute",
    marginLeft: "35vw",
    marginTop: "20vh",
  };

  return (<div className="bg-themeRed flex flex-row" style={style}>
    <div className="flex-0.3" style={{backgroundImage: colorMap[book.cover_id-1]}}>
    </div>

    <div className="w-full">
      <h1 className="text-xl font-bold text-center flex-0.7" style={{color: "#f1f7ed", textAlign: 'left'}}>
        {book.title}
      </h1>
    </div>

    <button onClick={() => setSelectedBook(null)}>Close</button>
  </div>);
}
