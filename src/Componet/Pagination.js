
const Pagination = ({ pageFind, lengthArray, handleChange }) => {
    let ArrayPagination = []

    for (let index = 1; index <= Math.ceil(lengthArray / pageFind); index++) {
        ArrayPagination.push(index)
    }

    return (
        <div className='col-lg-8 pagination'>
            {ArrayPagination.map((number) => (
                <a className='btn btn-warning paginationButton' onClick={() => handleChange(number)} href="#"
                    style={{ padding: '0.4%' }} key={number}>{number}</a>

            ))}
        </div>
    )
}

export default Pagination;