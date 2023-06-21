import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button} from 'antd';
import {Link} from "react-router-dom";

const renderAvatar = props => {
	return <Avatar {...props} className={`ant-avatar-${props.type}`}>{props.text}</Avatar>;
}

export const Campaign = props => {
	const { name, suffix, subTitle, id, type, src, icon, size, shape, gap, text} = props
	return (
		<>
			<div className="avatar-status d-flex align-items-center">
				{renderAvatar({icon, src, type, size, shape, gap, text })}
				<div className="ml-2">
					<div>
						<div className="avatar-status-name h4">{name}</div>
						<span>{suffix}</span>
					</div>
					<div className="text-muted avatar-status-subtitle h5">{subTitle} Supporters</div>
				</div>
			</div>
			<div>
				<Link to="/">
					<Button type="primary" shape="round">View</Button>
				</Link>
    		</div>
		</>
	)
}

Campaign.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string,
	type: PropTypes.string,
	onNameClick: PropTypes.func
}

export default Campaign;
