function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function Field({ label, value, onChange, type = 'text', rows, hint }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

function ListEditor({ label, items, onChange, placeholder = 'New item' }) {
  const updateItem = (index, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  return (
    <div className="admin-field">
      <span>{label}</span>
      <div className="admin-list">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="admin-list-row">
            <input
              value={item}
              onChange={(event) => updateItem(index, event.target.value)}
            />
            <button type="button" className="admin-button ghost" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="admin-button ghost" onClick={() => onChange([...items, ''])}>
          Add {placeholder}
        </button>
      </div>
    </div>
  );
}

function HomeEditor({ locale, data, onChange }) {
  const update = (path, value) => {
    onChange((current) => {
      const next = structuredClone(current);
      const keys = path.split('.');
      let cursor = next;
      keys.slice(0, -1).forEach((key) => {
        cursor = cursor[key];
      });
      cursor[keys.at(-1)] = value;
      return next;
    });
  };

  return (
    <div className="admin-panel">
      <h2>Home — {locale.toUpperCase()}</h2>
      <Field label="Site title" value={data.home.title} onChange={(value) => update('home.title', value)} />
      <Field label="Eyebrow" value={data.home.eyebrow} onChange={(value) => update('home.eyebrow', value)} />
      <Field label="Subtitle" value={data.home.subtitle} onChange={(value) => update('home.subtitle', value)} rows={3} />
      <ListEditor label="Skills" items={data.home.skills} onChange={(value) => update('home.skills', value)} placeholder="skill" />
      <Field label="Primary CTA" value={data.home.cta.primary} onChange={(value) => update('home.cta.primary', value)} />
      <Field label="Secondary CTA" value={data.home.cta.secondary} onChange={(value) => update('home.cta.secondary', value)} />
      <Field label="Spotlight label" value={data.home.spotlight.label} onChange={(value) => update('home.spotlight.label', value)} />
      <Field label="Spotlight description" value={data.home.spotlight.description} onChange={(value) => update('home.spotlight.description', value)} rows={3} />
      <ListEditor label="Spotlight bullets" items={data.home.spotlight.bullets} onChange={(value) => update('home.spotlight.bullets', value)} placeholder="bullet" />
    </div>
  );
}

function AboutEditor({ locale, data, onChange }) {
  const update = (path, value) => {
    onChange((current) => {
      const next = structuredClone(current);
      const keys = path.split('.');
      let cursor = next;
      keys.slice(0, -1).forEach((key) => {
        cursor = cursor[key];
      });
      cursor[keys.at(-1)] = value;
      return next;
    });
  };

  const updateHighlight = (index, field, value) => {
    onChange((current) => {
      const next = structuredClone(current);
      next.about.highlights[index][field] = value;
      return next;
    });
  };

  return (
    <div className="admin-panel">
      <h2>About — {locale.toUpperCase()}</h2>
      <Field label="Title" value={data.about.title} onChange={(value) => update('about.title', value)} />
      <Field label="Intro" value={data.about.intro} onChange={(value) => update('about.intro', value)} rows={3} />
      <ListEditor label="Body paragraphs" items={data.about.body} onChange={(value) => update('about.body', value)} placeholder="paragraph" />
      <Field label="Side panel title" value={data.about.sidePanelTitle} onChange={(value) => update('about.sidePanelTitle', value)} />
      <ListEditor label="Side panel items" items={data.about.sidePanelItems} onChange={(value) => update('about.sidePanelItems', value)} placeholder="item" />
      {data.about.highlights.map((highlight, index) => (
        <div key={`highlight-${index}`} className="admin-subpanel">
          <Field label={`Highlight ${index + 1} label`} value={highlight.label} onChange={(value) => updateHighlight(index, 'label', value)} />
          <Field label={`Highlight ${index + 1} text`} value={highlight.text} onChange={(value) => updateHighlight(index, 'text', value)} />
        </div>
      ))}
    </div>
  );
}

function PagesEditor({ locale, data, onChange }) {
  const update = (section, field, value) => {
    onChange((current) => {
      const next = structuredClone(current);
      next[section][field] = value;
      return next;
    });
  };

  return (
    <div className="admin-panel">
      <h2>Pages — {locale.toUpperCase()}</h2>
      <div className="admin-subpanel">
        <h3>Blog page</h3>
        <Field label="Title" value={data.blog.title} onChange={(value) => update('blog', 'title', value)} />
        <Field label="Intro" value={data.blog.intro} onChange={(value) => update('blog', 'intro', value)} rows={3} />
        <Field label="Callout label" value={data.blog.calloutLabel} onChange={(value) => update('blog', 'calloutLabel', value)} />
        <Field label="Callout text" value={data.blog.calloutText} onChange={(value) => update('blog', 'calloutText', value)} rows={2} />
      </div>
      <div className="admin-subpanel">
        <h3>Projects page</h3>
        <Field label="Title" value={data.projectsPage.title} onChange={(value) => update('projectsPage', 'title', value)} />
        <Field label="Intro" value={data.projectsPage.intro} onChange={(value) => update('projectsPage', 'intro', value)} rows={3} />
        <Field label="Spotlight label" value={data.projectsPage.spotlightLabel} onChange={(value) => update('projectsPage', 'spotlightLabel', value)} />
        <Field label="Spotlight text" value={data.projectsPage.spotlightText} onChange={(value) => update('projectsPage', 'spotlightText', value)} rows={2} />
        <Field label="Project link label" value={data.projectsPage.projectLink} onChange={(value) => update('projectsPage', 'projectLink', value)} />
      </div>
    </div>
  );
}

function SiteEditor({ locale, data, onChange }) {
  const update = (field, value) => {
    onChange((current) => {
      const next = structuredClone(current);
      if (!next.site) {
        next.site = { name: '', email: '', github: '', location: '' };
      }
      next.site[field] = value;
      return next;
    });
  };

  return (
    <div className="admin-panel">
      <h2>Site settings — {locale.toUpperCase()}</h2>
      <Field label="Name" value={data.site?.name || ''} onChange={(value) => update('name', value)} />
      <Field label="Email" value={data.site?.email || ''} onChange={(value) => update('email', value)} />
      <Field label="GitHub URL" value={data.site?.github || ''} onChange={(value) => update('github', value)} />
      <Field label="Location" value={data.site?.location || ''} onChange={(value) => update('location', value)} />
    </div>
  );
}

function CollectionEditor({ locale, type, data, onChange }) {
  const items = data[type];
  const isProject = type === 'projects';
  const label = isProject ? 'Project' : 'Post';
  const basePath = isProject ? '/projects' : '/blog';

  const updateItem = (index, field, value) => {
    onChange((current) => {
      const next = structuredClone(current);
      next[type][index][field] = value;
      if (field === 'slug') {
        next[type][index].href = `${basePath}/${value}`;
      }
      if (field === 'title' && !next[type][index].slug) {
        const slug = slugify(value);
        next[type][index].slug = slug;
        next[type][index].href = `${basePath}/${slug}`;
      }
      return next;
    });
  };

  const updateTags = (index, value) => {
    updateItem(index, 'tags', value.split(',').map((tag) => tag.trim()).filter(Boolean));
  };

  const updateBody = (index, value) => {
    updateItem(index, 'body', value.split('\n\n').map((paragraph) => paragraph.trim()).filter(Boolean));
  };

  const addItem = () => {
    onChange((current) => {
      const next = structuredClone(current);
      next[type].unshift({
        slug: '',
        title: `New ${label}`,
        href: `${basePath}/new-${label.toLowerCase()}`,
        ...(isProject ? { year: new Date().getFullYear().toString() } : { date: new Date().toISOString().slice(0, 10), excerpt: '' }),
        tags: [],
        description: '',
        details: '',
        body: ['']
      });
      return next;
    });
  };

  const removeItem = (index) => {
    onChange((current) => {
      const next = structuredClone(current);
      next[type] = next[type].filter((_, itemIndex) => itemIndex !== index);
      return next;
    });
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>{isProject ? 'Projects' : 'Blog posts'} — {locale.toUpperCase()}</h2>
        <button type="button" className="admin-button primary" onClick={addItem}>Add {label}</button>
      </div>
      {items.map((item, index) => (
        <article key={`${type}-${item.slug}-${index}`} className="admin-subpanel">
          <div className="admin-panel-header">
            <h3>{item.title || `Untitled ${label}`}</h3>
            <button type="button" className="admin-button ghost danger" onClick={() => removeItem(index)}>Delete</button>
          </div>
          <Field label="Title" value={item.title} onChange={(value) => updateItem(index, 'title', value)} />
          <Field label="Slug" value={item.slug} onChange={(value) => updateItem(index, 'slug', slugify(value))} hint="Used in the URL" />
          {isProject ? (
            <Field label="Year" value={item.year} onChange={(value) => updateItem(index, 'year', value)} />
          ) : (
            <Field label="Date" type="date" value={item.date} onChange={(value) => updateItem(index, 'date', value)} />
          )}
          <Field label="Tags" value={item.tags.join(', ')} onChange={(value) => updateTags(index, value)} hint="Comma-separated" />
          <Field label="Description" value={item.description} onChange={(value) => updateItem(index, 'description', value)} rows={3} />
          {isProject ? (
            <Field label="Details" value={item.details || ''} onChange={(value) => updateItem(index, 'details', value)} rows={2} />
          ) : (
            <Field label="Excerpt" value={item.excerpt || ''} onChange={(value) => updateItem(index, 'excerpt', value)} rows={2} />
          )}
          <Field label="Body paragraphs" value={(item.body || []).join('\n\n')} onChange={(value) => updateBody(index, value)} rows={8} hint="Separate paragraphs with a blank line" />
        </article>
      ))}
    </div>
  );
}

export {
  HomeEditor,
  AboutEditor,
  PagesEditor,
  SiteEditor,
  CollectionEditor
};
