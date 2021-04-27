import React from 'react'
import {
  makeStyles,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => ({
  FAQText: {
    fontSize: "1.6rem",
  },
  accordionHeader: {
    backgroundColor: "#f1961d",
  },
}));

const FAQ = () => {

  const classes = useStyles()

  return(
    <div>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ paddingTop: "20px", width: "60%" }}
      >
        <Grid item xs={12}>
          <Divider />
          <Typography variant="h3" paragraph>
            Frequently Asked Questions
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                How do I join a party?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Install thingies and join online when the time is right and the
                full moon shines.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                What kind of qualifications do Party Gurus have?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                What is Discord and how do I install it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                What is Minecraft and how do I install it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}

export default FAQ