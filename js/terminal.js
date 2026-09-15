// ---------- Embedded autonomous terminal ----------
const sequence = [
  { type: 'cmd', text: 'systemctl status fixops-engine' },
  { type: 'log', text: '<span class="tag-success">[OK]</span> Core daemon active (running). Uptime: 99.98%' },
  { type: 'log', text: '<span class="tag-info">[INFO]</span> Monitoring Redis cache &amp; Asyncio event loops...' },
  { type: 'cmd', text: 'docker-compose up -d --build backend' },
  { type: 'log', text: '<span class="tag-info">[BUILD]</span> Step 1/8 : FROM python:3.12-slim' },
  { type: 'log', text: '<span class="tag-info">[BUILD]</span> Step 4/8 : RUN pip install --no-cache-dir -r requirements.txt' },
  { type: 'log', text: '<span class="tag-success">[OK]</span> Container [backend_api_1] started successfully.' },
  { type: 'cmd', text: 'python3 -m app.main --check-health' },
  { type: 'log', text: '<span class="tag-info">[HEALTH]</span> DB PostgreSQL connection: ESTABLISHED' },
  { type: 'log', text: '<span class="tag-info">[HEALTH]</span> Telegram Bot Dispatcher: ONLINE' },
  { type: 'log', text: '<span class="tag-warn">[WARN]</span> High traffic detected on route /api/v1/deliveries' },
  { type: 'log', text: '<span class="tag-success">[AUTO-SCALE]</span> Allocated 2 additional worker threads.' },
  { type: 'cmd', text: 'clear' }
];

let terminalStarted = false;

function termSleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function termTypeText(body, targetElement, text, speed = 35) {
  return new Promise((resolve) => {
    let i = 0;
    function type() {
      if (i < text.length) {
        targetElement.innerHTML += text.charAt(i);
        i++;
        body.scrollTop = body.scrollHeight;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

async function runAutonomousTerminal(body) {
  while (true) {
    for (const item of sequence) {
      if (item.type === 'cmd') {
        if (item.text === 'clear') {
          await termSleep(1500);
          body.innerHTML = '';
          continue;
        }
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = `<span class="prompt">virtu@core:~$</span> <span class="cmd-text"></span><span class="cursor"></span>`;
        body.appendChild(line);

        const cmdTextElem = line.querySelector('.cmd-text');
        const cursorElem = line.querySelector('.cursor');

        await termTypeText(body, cmdTextElem, item.text, 40);
        await termSleep(300);

        cursorElem.remove();
        await termSleep(200);

      } else if (item.type === 'log') {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.paddingLeft = '12px';
        line.innerHTML = item.text;
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;

        await termSleep(500);
      }
    }
  }
}

function startTerminal() {
  if (terminalStarted) return;
  terminalStarted = true;
  const body = document.getElementById('terminal-body');
  if (body) runAutonomousTerminal(body);
}
