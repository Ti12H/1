// @ts-nocheck
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../../ResultsModal/ResultsModal.module.css";

import classNames from "classnames";
import RerollContainer from "../../Reroll/RerollContainer";
import { ResultsModalPropTypes } from "../../ResultsModal/ResultsModalTypes";
import CodeSpan from "../../CodeSpan/CodeSpan";
import joinAsBlocks from "../../../utils/joinAsBlocks";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import tooltip from "../../../locale/tooltip";
import ResultVsSkillRow from "../../ResultVsSkillRow/ResultVsSkillRow";

function ResultsModal2d20({
  hideMsg,
  msgData,
  showModal,
}: ResultsModalPropTypes) {
  const { msgParams } = msgData;
  const {
    rollOptions,
    results,
    successLevel,
    assistanceSuccessLevel,
    assistanceDiceResults,
    rerollCount,
  } = msgParams;

  if (!successLevel) {
    return null;
  }

  const { isSuccess } = successLevel;

  // Actual values
  const {
    diceAmount,
    difficulty,
    focus,
    fortune,
    tn,
    untrainedTest,
    assistanceFocus,
    assistanceTn,
    assistanceUntrainedTest,
  } = rollOptions;

  const assistanceDiceResultsJoined = joinAsBlocks(assistanceDiceResults);

  return (
    <Modal show={showModal} onHide={hideMsg}>
      <Modal.Header
        closeButton
        className={classNames({
          [`${styles.isFailure}`]: isSuccess === false,
          [`${styles.resultsModalHeader}`]: true,
        })}
      >
        <Modal.Title className={styles.resultsModalTitle}>
          Roll Results
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.resultsBody}>
        <div className={styles.rollResults}>
          {/* TITLE */}
          <div className={styles.conanResultDetails}>
            <div className={styles.resultDetailsRow}>
              You rolled <CodeSpan>{diceAmount}d20</CodeSpan>
            </div>
            <div className={styles.resultDetailsRow}>
              Focus: <CodeSpan>{focus || 0}</CodeSpan>
            </div>
            <div className={styles.resultDetailsRow}>
              TN: <CodeSpan>{tn}</CodeSpan>
            </div>
            {untrainedTest && (
              <div className={styles.resultDetailsRow}>Untrained Test</div>
            )}
            {!!fortune && (
              <div className={styles.resultDetailsRow}>
                Fortune points used: <CodeSpan>{fortune}</CodeSpan>
              </div>
            )}
          </div>
        </div>
        {/*  Rerroll Count Field*/}
        <div className={`${styles.generalResult}`}>
          Rerolled <CodeSpan>{rerollCount}</CodeSpan>{" "}
          {rerollCount === 1 ? "time" : "times"}
        </div>
        {/*  Assistance Field */}
        <div
          className={classNames(
            styles.conanResultDetails,
            styles.conanResultDetailsAssistance
          )}
        >
          <div className={styles.resultDetailsRow}>
            <strong>Assistance Roll:</strong>
          </div>
          <div className={styles.resultDetailsRow}>
            Rolled: {assistanceDiceResultsJoined}
          </div>
          {assistanceFocus !== "" && (
            <div className={styles.resultDetailsRow}>
              Assistance Focus: <CodeSpan>{assistanceFocus}</CodeSpan>
            </div>
          )}
          {assistanceTn !== "" && (
            <div className={styles.resultDetailsRow}>
              Assistance TN: <CodeSpan>{assistanceTn}</CodeSpan>
            </div>
          )}
          {assistanceUntrainedTest && (
            <div className={styles.resultDetailsRow}>
              Assistance Untrained Test
            </div>
          )}
          <div className={styles.resultDetailsRow}>
            Successes:{" "}
            <CodeSpan
              type={assistanceSuccessLevel.successLevel > 0 ? "success" : ""}
            >
              {assistanceSuccessLevel.successLevel}
            </CodeSpan>
          </div>
          {assistanceSuccessLevel.complications && (
            <div className={styles.assistanceResultRow}>
              Complications:{" "}
              <CodeSpan type="failure">
                {assistanceSuccessLevel.complications}
              </CodeSpan>
            </div>
          )}
          <InfoTooltip
            content={tooltip.assistance}
            className={styles.assistanceIcon}
          />
        </div>
        {/* Results Vs Skill Row*/}
        <ResultVsSkillRow
          skillLevel={difficulty}
          finalDieResult={successLevel.successLevel}
          isSuccess={successLevel.isSuccess}
          labels={{
            result: "Successes",
            vs: "Difficulty",
          }}
        />
        {/* Success of Failure */}
        <div
          className={classNames({
            [`${styles.generalResult}`]: true,
            [`${styles.generalResultSuccess}`]: successLevel.isSuccess,
            [`${styles.generalResultFailure}`]: !successLevel.isSuccess,
          })}
        >
          {successLevel.isSuccess ? "Success" : "Failure"}
        </div>
        {/* Complications and Momentum */}
        <div className={classNames(styles.slResult, styles.momentumResults)}>
          <div>
            <div>
              <span
                className={classNames({
                  [`${styles.slResultLabel}`]: true,
                  [`${styles.inactive}`]: successLevel.complications === 0,
                })}
              >
                Complications:
              </span>
            </div>
            <div>
              <CodeSpan
                className={styles.slResultSpan}
                type={successLevel.complications > 0 ? "failure" : "inactive"}
              >
                {successLevel.complications}
              </CodeSpan>
            </div>
          </div>
          <div>
            <div>
              <span
                className={classNames({
                  [`${styles.slResultLabel}`]: true,
                  [`${styles.inactive}`]: successLevel.momentum === 0,
                })}
              >
                Momentum:
              </span>
            </div>
            <div>
              <CodeSpan
                className={styles.slResultSpan}
                type={successLevel.momentum > 0 ? "success" : "inactive"}
              >
                {successLevel.momentum}
              </CodeSpan>
            </div>
          </div>
        </div>
        {/* Reroll Container*/}
        <RerollContainer
          rollOptions={rollOptions}
          isPool={false}
          results={results}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button block variant="outline-secondary" onClick={hideMsg}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultsModal2d20;