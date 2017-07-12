'use strict'

module.exports = {
  HeaderLabels: [ [ 'Attribute', 'Value' ] ],

  TopLevelAttributes: [
    'current_jobs_ready',
    'current_jobs_urgent',
    'current_jobs_reserved',
    'current_jobs_delayed',
    'current_jobs_buried',
    'job_timeouts',
    'current_tubes',
    'current_connections',
    'current_workers',
    'current_waiting',
    'total_jobs'
  ],

  TubeAttributes: [
    'ready',
    'reserved',
    'delayed',
    'buried',
    'using',
    'watching'
  ]
}
