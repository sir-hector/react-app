import React from 'react';
import classNames from "classnames";

export class Paginator extends React.Component {
    constructor(props) {
        super(props);
        const {pageCount} = this.props;
        this.range= [];

        for (let i =1; i<= pageCount; i++){
            this.range.push(i)
        }
    }
    render() {
        const {currentPage, setPage, previousPage, nextPage} = this.props;
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={previousPage}>
                            Poprzedni
                        </button>
                    </li>
                    {
                        this.range.map(page => {
                            const onClick = e => {
                                e.preventDefault()
                                setPage(page)
                            }
                            return (
                                <li key={page} className={classNames('page-item', {active: currentPage === page})}>
                                <button className="page-link" onClick={onClick}>
                                    {page}
                                </button>
                                </li>
                            )
                        })
                    }
                    <li className="page-item">
                        <button className="page-link" onClick={nextPage}>
                            Następny
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }

}