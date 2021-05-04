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

const FAQ = (props) => {

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
            {/* FAQ answer text for joining a party */}
            <AccordionDetails>
              <Typography className={classes.FAQText}>
              You only need to fill the required information. When the party is starting, come join us on discord an we can get the party started!
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
            {/* FAQ answer text for party gurus and their qualifications */}
            <AccordionDetails>
              <Typography className={classes.FAQText}>
              Our Party Gurus are experienced gamers and entertainers. They know how to keep the party going and also impress your mates with their epic gaming skills.
              There is never a boring party with these guys around!
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
            {/* FAQ answer text for discord and it's installation */}
            <AccordionDetails>
              <Typography className={classes.FAQText}>
              Discord is a free VoIP platform in which you can use text messaging and voice/video calls with your contacts.
              You can create private groups and channels that are only accessible to people of your choosing.
              You can install discord
              <a href="https://discord.com/download"> from here. </a>
              We have also made a video tutorial on installing discord which you can watch
               <a href="https://www.youtube.com/watch?v=EfnG4zstVjU"> right here </a>
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
                What is {props.gameName} and how do I install it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* FAQ answer text for game info and it's installation, obtained from backend */}
              <Typography className={classes.FAQText}>
                {props.faq}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}

export default FAQ