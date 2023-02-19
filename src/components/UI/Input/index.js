import { Form } from "react-bootstrap";

function Input({ options = [], type = "text", ...props }) {
  let input = null;
  switch (type) {
    case "text": {
      input = (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <Form.Control
            type={type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={props.className}
          />
          {props.errMessage && (
            <Form.Text className="text-muted">{props.errMessage}</Form.Text>
          )}
        </Form.Group>
      );
      break;
    }
    case "file": {
      input = (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <Form.Control
            type={type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={props.className}
          />
          {props.errMessage && (
            <Form.Text className="text-muted">{props.errMessage}</Form.Text>
          )}
        </Form.Group>
      );
      break;
    }
    case "email": {
      input = (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <Form.Control
            type={type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={props.className}
          />
          {props.errMessage && (
            <Form.Text className="text-muted">{props.errMessage}</Form.Text>
          )}
        </Form.Group>
      );
      break;
    }
    case "select": {
      input = (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <select
            value={props.value}
            className={props.className}
            onChange={props.onChange}
          >
            <option value="">{props.placeholder}</option>
            {options.length > 0
              ? options.map((opt, index) => (
                  <option key={index} value={opt.value}>
                    {opt.name}
                  </option>
                ))
              : null}
          </select>
        </Form.Group>
      );
    }

    default:
      break;
  }
  return input;
}

export default Input;
