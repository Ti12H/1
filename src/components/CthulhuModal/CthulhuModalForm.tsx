import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./CthulhuModalForm.css";
import InputRange from "../InputRange/InputRange";
import cthulhuSkillsList, {
  getSkillById,
  SkillType,
} from "../CthulhuSheetModal/utils/cthulhuSkillsList";
import cthulhuAttributesList, {
  AttributeType,
  getAttributeById,
} from "../CthulhuSheetModal/utils/cthulhuAttributesList";

const PercentIcon = () => (
  <span className="percent-icon">
    <FontAwesomeIcon icon={faPercent} />
  </span>
);

const TimesIcon = ({ onClick }: { onClick: (e: any) => void }) => (
  <span className="cthulhu-select-to-sheet__times-icon" onClick={onClick}>
    <FontAwesomeIcon icon={faTimes} />
  </span>
);

const createRenderer =
  (render: any) =>
  // @ts-ignore
  ({ input, label, id, textMuted, meta, disabled }, ...rest) => {
    return <>{render(input, label, id, textMuted, meta, disabled, rest)}</>;
  };

const renderInput = createRenderer(
  // @ts-ignore
  (input, label, id, textMuted, meta) => {
    const { submitFailed, touched, error } = meta;
    const numValue = Number(input.value);
    const hasError = !!((submitFailed || touched) && error);
    const halfValue = isNaN(numValue) ? 0 : Math.floor(numValue * 0.5);
    const fifthValue = isNaN(numValue) ? 0 : Math.floor(numValue * 0.2);

    return (
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <div className="skill-level-field__cthulhu-group">
          <div className="percent-icon-container">
            <Form.Control
              className="skill-level-field__cthulhu-group__main-input"
              type="text"
              size="lg"
              placeholder="00"
              autoComplete="off"
              isInvalid={hasError}
              {...input}
            />
            <PercentIcon />
          </div>
          <div className="percent-derived-values">
            <div>
              <Form.Control
                value={numValue ? `${halfValue}%` : ""}
                className="percent-derived-values__input percent-derived-values__input--half"
                placeholder="1/2"
                disabled
                size="sm"
                autoComplete="off"
              />
            </div>
            <div>
              <Form.Control
                value={numValue ? `${fifthValue}%` : ""}
                className="percent-derived-values__input percent-derived-values__input--fifth"
                placeholder="1/5"
                disabled
                size="sm"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        {hasError && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
        {textMuted && <Form.Text className="text-muted">{textMuted}</Form.Text>}
      </Form.Group>
    );
  }
);

const RenderCheckbox = createRenderer(
  // @ts-ignore
  (input, label, id, textMuted, meta, disabled) => {
    return (
      <Form.Check
        type="checkbox"
        label={label}
        disabled={disabled}
        id={id}
        custom
        {...input}
      />
    );
  }
);

const bonusDieLabel = (
  <span>
    Apply <strong>one</strong> Bonus Die
  </span>
);
const bonusTwoDiceLabel = (
  <span>
    Apply <strong>two</strong> Bonus Dice
  </span>
);
const penaltyDieLabel = (
  <span>
    Apply <strong>one</strong> Penalty Die
  </span>
);
const penaltyTwoDiceLabel = (
  <span>
    Apply <strong>two</strong> Penalty Dice
  </span>
);

function CthulhuModalForm({
  formId,
  change,
  invalid,
  anyTouched,
  submitFailed,
  handleSubmit,
  specialDie,
  skillId = "",
  skillLevel,
}: any) {
  const { cthulhuBonus, cthulhuTwoBonus, cthulhuPenalty, cthulhuTwoPenalty } =
    specialDie;

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    change("skillLevel", event.target.value);
  };

  const handleDropdownChange = (event: any, id: string) => {
    event.preventDefault();
    change("skillId", id);
  };

  const clearSkill = (event: any) => {
    event.preventDefault();
    change("skillId", "");
  };

  const selectedSkill =
    getSkillById(skillId) || getAttributeById(skillId) || null;

  return (
    <Form
      className={invalid && (submitFailed || anyTouched) ? "form-invalid" : ""}
      id={formId}
      onSubmit={handleSubmit}
    >
      <div className="skill-level-field skill-level-field--with-range">
        <Field
          id="skillLevel"
          name="skillLevel"
          label="Skill level:"
          textMuted="Enter your Investigator's skill level"
          component={renderInput}
        />
        <InputRange onChange={handleRangeChange} value={skillLevel} />
      </div>
      <Form.Row className="cthulhu-checkboxes-row">
        <Form.Group as={Col} md="6">
          <Field
            name="cthulhuBonus"
            id="cthulhuBonus"
            label={bonusDieLabel}
            component={RenderCheckbox}
            disabled={cthulhuPenalty || cthulhuTwoPenalty || cthulhuTwoBonus}
          />
          <Field
            name="cthulhuTwoBonus"
            id="cthulhuTwoBonus"
            label={bonusTwoDiceLabel}
            component={RenderCheckbox}
            disabled={cthulhuPenalty || cthulhuTwoPenalty || cthulhuBonus}
          />
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Field
            name="cthulhuPenalty"
            id="cthulhuPenalty"
            label={penaltyDieLabel}
            component={RenderCheckbox}
            disabled={cthulhuBonus || cthulhuTwoPenalty || cthulhuTwoBonus}
          />
          <Field
            name="cthulhuTwoPenalty"
            id="cthulhuTwoPenalty"
            label={penaltyTwoDiceLabel}
            component={RenderCheckbox}
            disabled={cthulhuBonus || cthulhuPenalty || cthulhuTwoBonus}
          />
        </Form.Group>
      </Form.Row>
      <section className="cthulhu-select-to-sheet__container">
        <input type="hidden" name="skillId" id="skillId" value={skillId} />
        <Dropdown className="cthulhu-select-to-sheet__dropdown">
          <Dropdown.Toggle
            variant="outline-secondary"
            id="cthulhu-select-to-sheet-dropdown"
            className="cthulhu-select-to-sheet__button"
          >
            <span>
              {selectedSkill?.name || "Save a Skill to the Character Sheet"}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="cthulhu-select-to-sheet__list">
              {" "}
              {cthulhuAttributesList.map(({ id, name }: AttributeType) => (
                <Dropdown.Item
                  key={id}
                  href="#"
                  className={classNames({
                    "cthulhu-select-to-sheet__item--selected":
                      skillId && skillId === id,
                  })}
                  onClick={(e) => handleDropdownChange(e, id)}
                >
                  {name}
                </Dropdown.Item>
              ))}{" "}
            </div>
            <div className="cthulhu-select-to-sheet__list-separator" />
            <div className="cthulhu-select-to-sheet__list">
              {" "}
              {cthulhuSkillsList.map(({ id, name }: SkillType) => (
                <Dropdown.Item
                  key={id}
                  href="#"
                  className={classNames({
                    "cthulhu-select-to-sheet__item--selected":
                      skillId && skillId === id,
                  })}
                  onClick={(e) => handleDropdownChange(e, id)}
                >
                  {name}
                </Dropdown.Item>
              ))}{" "}
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <TimesIcon onClick={clearSkill} />
      </section>
    </Form>
  );
}

type errorsProps = {
  skillLevel?: string;
};

const validate = (values: any) => {
  const errors: errorsProps = {};
  const { skillLevel } = values;
  const skillLevelNumber = parseInt(skillLevel, 10);

  if (!skillLevel || !skillLevel.trim()) {
    errors.skillLevel = "Skill level cannot be empty";
    return errors;
  }
  if (skillLevelNumber <= 0) {
    errors.skillLevel = "Skill level must be greater than 0";
    return errors;
  }
  if (skillLevelNumber > 200) {
    errors.skillLevel = "Skill level must be less than 200%";
    return errors;
  }
  if (isNaN(skillLevelNumber)) {
    errors.skillLevel = "Skill level must be a valid number";
    return errors;
  }
  return errors;
};

const form = "cthulhuForm";

const FormElement = reduxForm({
  form,
  validate,
})(CthulhuModalForm);

const selector = formValueSelector(form);

export default connect((state) => ({
  skillId: selector(state, "skillId"),
  skillLevel: selector(state, "skillLevel"),
  specialDie: selector(
    state,
    "cthulhuBonus",
    "cthulhuPenalty",
    "cthulhuTwoBonus",
    "cthulhuTwoPenalty"
  ),
}))(FormElement);
