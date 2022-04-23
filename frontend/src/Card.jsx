export const Card = ({ title, children }) => <div className="card mb-3">
    {
        !!title && <div className="card-header bg-dark text-white">{title}</div>
    }
    <div className="card-body">
        { children }
    </div>
</div>;