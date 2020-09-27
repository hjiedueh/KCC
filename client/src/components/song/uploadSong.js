import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import Input from "../form/input";

const UploadSong = ({ loading, song, onBlur, onChange, onSubmit }) => {
	const { title, artist, file, errors } = song;
	return (
      	<Container>
      		<Row>
      			<Col className="mx-auto" sm={11} md={7} lg={5}>
      				<Card className="my-4">
      					<Form
      						noValidate
      						onSubmit={onSubmit}
      						className="p-sm-3 p-xs-1"
      					>
      						<Card.Body>
      							<Card.Title
      								as="h3"
      								className="text-center mb-4 mt-2 theme-color"
      							>
      								Upload Song
      							</Card.Title>
      							<Input
      								name="title"
      								type="text"
      								placeholder="Enter title of song"
      								value={title}
      								onChange={onChange}
      								onBlur={onBlur}
      								text={{
      									module: "UploadSong",
      									label: "Title",
      									error: errors.title
      								}}
      							/>
      							<Input
      								name="artist"
      								type="text"
      								placeholder="Enter song artist"
      								value={artist}
      								onChange={onChange}
      								onBlur={onBlur}
      								text={{
      									module: "UploadSong",
      									label: "Artist",
      									error: errors.artist
      								}}
      							/>
      							<Input
      								name="file"
      								type="file"
      								placeholder="Upload song"
      								value={file}
      								onChange={onChange}
      								onBlur={onBlur}
      								text={{
      									module: "UploadSong",
      									label: "File",
      									error: errors.file
      								}}
      							/>
      							<Button
      								variant="info"
      								type="submit"
      								className="mt-4"
      								disabled={loading}
      							>
      								Submit
      							</Button>
      						</Card.Body>
      					</Form>
      				</Card>
      			</Col>
      		</Row>
      	</Container>
   	);
};

UploadSong.propTypes = {
   onSubmit: PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
   onBlur: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired
};

export default UploadSong;