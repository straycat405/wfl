
export default function NewListForm( movies) {

    return (
        <>
        <h2>Section title</h2>
        <div class="table-responsive small">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">날짜</th>
                <th scope="col">자산</th>
                <th scope="col">카테고리</th>
                <th scope="col">금액</th>
                <th scope="col">메모</th>
              </tr>
            </thead>
            <tbody>
            {movies.map((movie) => (
            <tr key={movie.date}>
              <td>{movie.sep}</td>
              <td>{movie.category}</td>
              <td>{movie.price}</td>
              <td>{movie.meomo}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        </>
    );
  }
  