import React from 'react';
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

const AdminSearch = (props) => {
    return (
        <Row>
            <Col md="6">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={props.searchTitle}
                    onChange={props.onChangeSearchTitle}
                    onKeyUp={props.retrieveTable}
                />
            </Col>
            <Col md="4">
                {"Items per Page: "}
                <select onChange={props.handlePageSizeChange} value={props.pageSize}>
                    {props.pageSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </Col>
            {props.isAddUrl && (
                <Col md="2">
                    <Link to={props.addUrl}>
                        <button className="color button">+ Add</button>
                    </Link>
                </Col>
            )}
        </Row>
    );
}

export default AdminSearch;