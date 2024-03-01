const baseUrl = 'https://jsearch.p.rapidapi.com/search';
let searchQuery = 'UPSC'; // Default search query

const options = {
    method: 'GET',
    headers: {
        // 'X-RapidAPI-Key': 'a102489748msh991ced42a84169bp129e66jsnf2831c8b97b0',
        // 'X-RapidAPI-Key': 'b439c44c15msh2c360ba612d320ep10f0b3jsn7a5edafd98df',
        'X-RapidAPI-Key': '52c758d50amshc72c05fb62a339fp150c09jsncd71ff7097a5',




        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
};

async function fetchJobs() {
    try {
        const loader = document.getElementById('loader');
        loader.style.display = 'block'; // Show loader

        const response = await fetch(`${baseUrl}?query=${searchQuery}inIndia&page=7&num_pages=7`, options);
        const result = await response.json();
        loader.style.display = 'none'; // Hide loader
        console.log(result);
        

        const jobResultsElement = document.getElementById('jobResults');
        jobResultsElement.innerHTML = ''; // Clear previous results

        if (result && result.data && result.data.length > 0) {
            result.data.forEach(job => {
                const card = document.createElement('div');
                card.className = 'job-card';

                const title = document.createElement('div');
                title.className = 'job-title';
                title.textContent = job.job_title || 'Job Title';

                const details = document.createElement('div');
                details.className = 'job-details';

                const logo = document.createElement('img');
                logo.src = job.employer_logo || 'placeholder-logo.png';
                logo.alt = 'Company Logo';
                logo.style.maxWidth = '100px';
                details.appendChild(logo);

                const employerName = document.createElement('p');
                employerName.textContent = 'Employer: ' + (job.employer_name || 'Unknown');
                details.appendChild(employerName);

                const location = document.createElement('p');
                location.textContent = 'Location: ' + (job.job_city + ', ' + job.job_country || 'Unknown');
                details.appendChild(location);

                const description = document.createElement('p');
                description.textContent = 'Description: ' + (job.job_description ? truncateDescription(job.job_description, 50) : 'No description available');
                details.appendChild(description);

                const employmentType = document.createElement('p');
                employmentType.textContent = 'Employment Type: ' + (job.job_employment_type || 'Unknown');
                details.appendChild(employmentType);

                const publisher = document.createElement('p');
                publisher.textContent = 'Publisher: ' + (job.job_publisher || 'Unknown');
                details.appendChild(publisher);

                const postedDate = document.createElement('p');
                postedDate.textContent = 'Posted Date: ' + formatUTCDate(job.job_posted_at_datetime_utc);
                details.appendChild(postedDate);

                const fullDescription = document.createElement('p');
                fullDescription.className = 'full-description';
                fullDescription.textContent = 'Full Description: ' + (job.job_description || 'No description available');
                details.appendChild(fullDescription);

                const applyButton = document.createElement('button');
                applyButton.className = 'apply-button';
                applyButton.textContent = 'Apply';
                applyButton.onclick = function () {
                    window.open(job.job_apply_link, '_blank');
                };
                details.appendChild(applyButton);

                card.appendChild(title);
                card.appendChild(details);
                jobResultsElement.appendChild(card);
            });
        } else {
            jobResultsElement.innerHTML = '<p>No jobs found.</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

function searchJobs() {
    const searchInput = document.getElementById('searchInput');
    searchQuery = searchInput.value.trim();
    fetchJobs();
}

function truncateDescription(text, limit) {
    const words = text.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
}

function formatUTCDate(utcDate) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(utcDate));
}

// Call the fetchJobs function when the page loads
fetchJobs();