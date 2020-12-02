import React from 'react';
import Timeline, { TimelineHeaders, SidebarHeader, DateHeader } from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

function TimelineCalendar() {

  const groups = [
    { 
      id: 1, title: 'Send APRIMI Survey to members', stackItems: true, height: 30
    }, 
    { 
      id: 2, title: 'Online registration for AM launch at web', stackItems: true, height: 30 
    }, 
    { 
      id: 3, title: 'Send AM Invitation to members by email', stackItems: true, height: 30 
    }, 
    { 
      id: 4, title: 'Committee Meeting for AM Preparation', stackItems: true, height: 30 
    }, 
    { 
      id: 5, title: 'Finalize Webinar Material (Tim AM & EO)', stackItems: true, height: 30 
    }, 
    { 
      id: 6, title: 'Final Coordination Meeting for AM (Tim AM & EO)', stackItems: true, height: 30 
    }, 
    { 
      id: 7, title: 'AM registration close', stackItems: true, height: 30 
    }, 
    { 
      id: 8, title: 'Open for waiting list participants (if any)', stackItems: true, height: 30 
    }, 
    { 
      id: 9, title: 'Send AM confirmation to participants & link event', stackItems: true, height: 30 
    }, 
    { 
      id: 10, title: 'Meeting Coordination IV (with MC 8:30pm)', stackItems: true, height: 30 
    }, 
    { 
      id: 11, title: 'Prepare Presentation Material for AM', stackItems: true, height: 30 
    }, 
    { 
      id: 12, title: 'Finalize AM Presentation', stackItems: true, height: 30 
    }, 
    { 
      id: 13, title: 'GR 1 AM (Speakers, APRIMI, EO)', stackItems: true, height: 30 
    }, 
    { 
      id: 14, title: 'GR 2 (APRIMI, Speakers & MC)', stackItems: true, height: 30 
    }, 
    { 
      id: 15, title: 'Event', stackItems: true, height: 30 
    }, 
    { 
      id: 16, title: 'Post Event Report', stackItems: true, height: 30 
    }, 
    { 
      id: 17, title: 'Invoice', stackItems: true, height: 30 
    }
  ]
 
const items = [
  {
    id: 1,
    group: 1,
    title: 'Admin',
    start_time: moment("2020-12-01 09:00:00").format('x'),
    end_time: moment("2020-12-01 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Admin',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Admin') }, */
      className: 'weekend',
      style: {
        background: 'lightgreen',
        color: 'black'
      }
    }
  },
  {
    id: 2,
    group: 2,
    title: 'Admin',
    start_time: moment("2020-12-01 09:00:00").format('x'),
    end_time: moment("2020-12-01 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Admin') }, */
      className: 'weekend',
      style: {
        background: 'lightgreen',
        color: 'black'
      }
    }
  },
  {
    id: 3,
    group: 3,
    title: 'Admin',
    start_time: moment("2020-12-02 09:00:00").format('x'),
    end_time: moment("2020-12-02 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Admin') }, */
      className: 'weekend',
      style: {
        background: 'lightgreen',
        color: 'black'
      }
    }
  },
  {
    id: 4,
    group: 4,
    title: 'Committee_APRIMI',
    start_time: moment("2020-12-03 09:00:00").format('x'),
    end_time: moment("2020-12-03 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Committee_APRIMI') }, */
      className: 'weekend',
      style: {
        background: 'orange',
        color: 'black'
      }
    }
  },
  {
    id: 5,
    group: 5,
    title: 'TIM_AM',
    start_time: moment("2020-12-03 09:00:00").format('x'),
    end_time: moment("2020-12-03 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('TIM_AM') }, */
      className: 'weekend',
      style: {
        background: 'blue',
        color: 'black'
      }
    }
  },
  {
    id: 6,
    group: 6,
    title: 'TIM_AM',
    start_time: moment("2020-12-04 09:00:00").format('x'),
    end_time: moment("2020-12-04 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('TIM_AM') }, */
      className: 'weekend',
      style: {
        background: 'blue',
        color: 'black'
      }
    }
  },
  {
    id: 7,
    group: 7,
    title: 'Admin',
    start_time: moment("2020-12-11 09:00:00").format('x'),
    end_time: moment("2020-12-11 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Admin') }, */
      className: 'weekend',
      style: {
        background: 'lightgreen',
        color: 'black'
      }
    }
  },
  {
    id: 8,
    group: 8,
    title: 'Admin',
    start_time: moment("2020-12-14 09:00:00").format('x'),
    end_time: moment("2020-12-14 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Admin') }, */
      className: 'weekend',
      style: {
        background: 'lightgreen',
        color: 'black'
      }
    }
  },
  {
    id: 9,
    group: 9,
    title: 'Admin',
    start_time: moment("2020-12-11 09:00:00").format('x'),
    end_time: moment("2020-12-11 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Admin') }, */
      className: 'weekend',
      style: {
        background: 'lightgreen',
        color: 'black'
      }
    }
  },
  {
    id: 10,
    group: 10,
    title: 'EO',
    start_time: moment("2020-12-08 09:00:00").format('x'),
    end_time: moment("2020-12-08 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('EO') }, */
      className: 'weekend',
      style: {
        background: 'purple',
        color: 'black'
      }
    }
  },
  {
    id: 11,
    group: 11,
    title: 'Committe_APRIMI',
    start_time: moment("2020-12-07 09:00:00").format('x'),
    end_time: moment("2020-12-11 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Committe_APRIMI') }, */
      className: 'weekend',
      style: {
        background: 'orange',
        color: 'black'
      }
    }
  },
  {
    id: 12,
    group: 12,
    title: 'Committe_APRIMI',
    start_time: moment("2020-12-14 09:00:00").format('x'),
    end_time: moment("2020-12-15 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('Committe_APRIMI') }, */
      className: 'weekend',
      style: {
        background: 'orange',
        color: 'black'
      }
    }
  },
  {
    id: 13,
    group: 13,
    title: 'TIM_AM',
    start_time: moment("2020-12-10 09:00:00").format('x'),
    end_time: moment("2020-12-10 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('TIM_AM') }, */
      className: 'weekend',
      style: {
        background: 'blue',
        color: 'black'
      }
    }
  },
  {
    id: 14,
    group: 14,
    title: 'TIM_AM',
    start_time: moment("2020-12-15 09:00:00").format('x'),
    end_time: moment("2020-12-15 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('TIM_AM') }, */
      className: 'weekend',
      style: {
        background: 'blue',
        color: 'black'
      }
    }
  },
  {
    id: 15,
    group: 15,
    title: 'DAY_EVENT',
    start_time: moment("2020-12-17 09:00:00").format('x'),
    end_time: moment("2020-12-17 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('DAY_EVENT') }, */
      className: 'weekend',
      style: {
        background: 'red',
        color: 'black'
      }
    }
  },
  {
    id: 16,
    group: 16,
    title: 'EO',
    start_time: moment("2020-12-22 09:00:00").format('x'),
    end_time: moment("2020-12-22 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('EO') }, */
      className: 'weekend',
      style: {
        background: 'purple',
        color: 'black'
      }
    }
  },
  {
    id: 17,
    group: 17,
    title: 'EO',
    start_time: moment("2020-12-22 09:00:00").format('x'),
    end_time: moment("2020-12-22 18:00:00").format('x'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      /* onMouseDown: () => { alert('EO') }, */
      className: 'weekend',
      style: {
        background: 'purple',
        color: 'black'
      }
    }
  }



]

  return (
    <div>
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().startOf("day").toDate()}
      defaultTimeEnd={moment().startOf("day").add(1, "day").toDate()}
      sidebarWidth={350}
      sidebarContent={<div className="reservation__label">Reservation</div>}
    >
      <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}></div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
    </Timeline>
  </div>
  )
}

export default TimelineCalendar
